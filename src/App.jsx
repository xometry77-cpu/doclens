import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import HomePage from './components/HomePage'
import ViewerPage from './components/ViewerPage'
import LoginPage from './components/LoginPage'

const API_BASE_URL = ''
export default function App() {
  const [page, setPage] = useState('home')

  // DOCLENS_AUTH_GATE_V1
  const [authState, setAuthState] =
    useState('checking')

  const [authBusy, setAuthBusy] =
    useState(false)

  const [authError, setAuthError] =
    useState('')

  const [pdfFile, setPdfFile] = useState(null)

  const [analyzed, setAnalyzed] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)

  const [
    manualEdits,
    setManualEditsState,
  ] = useState({})

  // Immediate cache of every manual preview edit.
  // Download Excel reads this without waiting for React render.
  const manualEditsRef =
    useRef({})

  const setManualEdits =
    useCallback(
      (update) => {
        const previous =
          manualEditsRef.current ||
          {}

        const next =
          typeof update ===
          'function'
            ? update(previous)
            : update

        const safeNext =
          next &&
          typeof next ===
            'object'
            ? next
            : {}

        // Synchronous ? available immediately to Download Excel.
        manualEditsRef.current =
          safeNext

        // Existing React preview behavior remains.
        setManualEditsState(
          safeNext
        )
      },
      []
    )

  const getLatestManualEdits =
    useCallback(
      () =>
        manualEditsRef.current ||
        {},
      []
    )

  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('')
  const [toastMessage, setToastMessage] = useState('')

  const timerRef = useRef([])
  const toastTimerRef = useRef(null)

  // =========================================================
  // FINAL DOCUMENT DATA
  // PDF DATA + MANUAL CORRECTIONS
  // =========================================================

  const finalDocumentData = analysisResult
    ? {
        ...analysisResult,

        extracted: {
          ...analysisResult.extracted,

          invoice: {
            ...analysisResult.extracted?.invoice,
            ...(manualEdits.invoice || {}),
          },

          exporter: {
            ...analysisResult.extracted?.exporter,
            ...(manualEdits.exporter || {}),
          },

          importer: {
            ...analysisResult.extracted?.importer,
            ...(manualEdits.importer || {}),
          },

          consignee: {
            ...analysisResult.extracted?.consignee,
            ...(manualEdits.consignee || {}),
          },

          sold_to: {
            ...analysisResult.extracted?.sold_to,
            ...(manualEdits.sold_to || {}),
          },

          shipment: {
            ...analysisResult.extracted?.shipment,
            ...(manualEdits.shipment || {}),
          },

          product: {
            ...analysisResult.extracted?.product,
            ...(manualEdits.product || {}),
          },

          company: {
            ...analysisResult.extracted?.company,
            ...(manualEdits.company || {}),
          },

          bank: {
            ...analysisResult.extracted?.bank,
            ...(manualEdits.bank || {}),
          },

          ui_overrides: {
            ...analysisResult.extracted?.ui_overrides,
            ...(manualEdits.ui_overrides || {}),
          },
        },
      }
    : null

  // =========================================================
  // TOAST
  // =========================================================

  const showToast = useCallback((message) => {
    setToastMessage(message)

    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current)
    }

    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage('')
    }, 2200)
  }, [])

  // =========================================================
  // CLEAR TIMERS
  // =========================================================

  const clearTimers = useCallback(() => {
    timerRef.current.forEach((timer) => {
      window.clearTimeout(timer)
    })

    timerRef.current = []
  }, [])

  // =========================================================
  // NORMAL MANUAL FIELD EDIT
  // =========================================================

  const handleFieldChange = useCallback(
    (section, field, value) => {
      setManualEdits((previous) => {
        const nextSection = {
          ...(previous[section] || {}),
          [field]: value,
        }

        // DOCPORT_AWB_TO_SHIPPING_BILL_SYNC_V1
        //
        // DHL Air Waybill Number is the source value
        // for every Shipping Bill Number field.
        if (
          section === 'shipment' &&
          field === 'awb_number'
        ) {
          nextSection.shipping_bill_number =
            value
        }

        return {
          ...previous,
          [section]: nextSection,
        }
      })
    },
    []
  )

  // =========================================================
  // PRODUCT ROW EDIT
  // =========================================================

  const handleLineItemChange = useCallback(
    (index, field, value) => {
      if (!analysisResult) {
        return
      }

      const currentItems =
        finalDocumentData?.extracted?.product?.line_items || []

      const updatedItems = currentItems.map(
        (item, itemIndex) => {
          if (itemIndex !== index) {
            return item
          }

          return {
            ...item,
            [field]: value,
          }
        }
      )

      setManualEdits((previous) => ({
        ...previous,

        product: {
          ...(previous.product || {}),
          line_items: updatedItems,
        },
      }))
    },
    [analysisResult, finalDocumentData]
  )

  // =========================================================
  // FILE CHANGE
  // =========================================================

  const handleFileChange = useCallback(
    (file) => {
      clearTimers()

      setPdfFile(file)
      setAnalyzed(false)
      setAnalysisResult(null)
      setManualEdits({})
      setProgress(0)
      setStatus('')

      if (!file) {
        return
      }

      const isPdf =
        file.type === 'application/pdf' ||
        file.name.toLowerCase().endsWith('.pdf')

      if (!isPdf) {
        setPdfFile(null)
        showToast('Please select a PDF file.')
      }
    },
    [clearTimers, showToast]
  )

  // =========================================================
  // ANALYZE PDF
  // =========================================================

  const handleAnalyze = async () => {
    if (!pdfFile) {
      showToast('Upload the Commercial Invoice PDF first.')
      return
    }

    try {
      clearTimers()

      setAnalyzed(false)
      setAnalysisResult(null)
      setManualEdits({})

      setProgress(15)
      setStatus('Reading PDF...')

      const formData = new FormData()

      formData.append('file', pdfFile)

      setProgress(40)

      setStatus(
        'Extracting invoice and product details...'
      )

      const response = await fetch(
        `${API_BASE_URL}/api/invoices/extract`,
        {
          method: 'POST',
          body: formData,
        }
      )

      let result

      try {
        result = await response.json()
      } catch {
        throw new Error(
          'Backend returned an invalid response.'
        )
      }

      if (!response.ok) {
        throw new Error(
          result?.detail ||
            result?.message ||
            'PDF analysis failed.'
        )
      }

      setProgress(80)

      setStatus(
        'Matching values with all 6 Excel sheets...'
      )

      setAnalysisResult(result)

      sessionStorage.setItem(
        'exportflow_analysis',
        JSON.stringify(result)
      )

      const productCount =
        result?.extracted?.product?.line_items?.length || 0

      setProgress(100)
      setAnalyzed(true)

      setStatus(
        `Analysis complete. ${productCount} ${
          productCount === 1
            ? 'product'
            : 'products'
        } found. Ready to generate Excel.`
      )

      console.log(
        'PDF ANALYSIS RESULT:',
        result
      )

      console.log(
        'EXTRACTED PRODUCTS:',
        result?.extracted?.product?.line_items || []
      )

      console.log(
        'MISSING FIELDS:',
        result?.missing_fields || []
      )

      showToast(
        `PDF analyzed successfully. ${productCount} ${
          productCount === 1
            ? 'product'
            : 'products'
        } found.`
      )
    } catch (error) {
      console.error(
        'Analyze PDF error:',
        error
      )

      setProgress(0)
      setAnalyzed(false)
      setAnalysisResult(null)
      setManualEdits({})

      const message =
        error?.message ||
        'Unable to analyze the PDF.'

      setStatus(message)
      showToast(message)
    }
  }

  // =========================================================
  // HOME GENERATE
  // Opens preview only
  // =========================================================

  const handleGenerate = useCallback(() => {
    if (!pdfFile) {
      showToast('Upload the PDF first.')
      return
    }

    if (!analyzed) {
      showToast('Analyze the PDF first.')
      return
    }

    if (!analysisResult) {
      showToast(
        'PDF analysis data is not available.'
      )

      return
    }

    setPage('viewer')

    window.scrollTo(0, 0)
  }, [
    pdfFile,
    analyzed,
    analysisResult,
    showToast,
  ])

  // =========================================================
  // BACK
  // =========================================================

  const handleBack = useCallback(() => {
    setPage('home')

    window.scrollTo(0, 0)
  }, [])


  // =========================================================
  // DOCLENS AUTHENTICATION
  // =========================================================

  const handleLogin = useCallback(
    async ({
      email,
      password,
    }) => {
      setAuthBusy(true)
      setAuthError('')

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/auth/login`,
          {
            method: 'POST',

            credentials: 'include',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({
              email,
              password,
            }),
          }
        )

        let result = {}

        try {
          result = await response.json()
        } catch {
          // Keep the fallback error below.
        }

        if (
          !response.ok ||
          !result?.ok
        ) {
          throw new Error(
            result?.detail ||
              'Invalid email or password.'
          )
        }

        setAuthState(
          'authenticated'
        )

        setAuthError('')
      } catch (error) {
        setAuthState(
          'anonymous'
        )

        setAuthError(
          error?.message ||
            'Unable to sign in.'
        )
      } finally {
        setAuthBusy(false)
      }
    },
    []
  )


  useEffect(() => {
    let cancelled = false

    const checkSession =
      async () => {
        try {
          const response =
            await fetch(
              `${API_BASE_URL}/api/auth/session`,
              {
                method: 'GET',
                credentials: 'include',
              }
            )

          const result =
            await response.json()

          if (cancelled) {
            return
          }

          setAuthState(
            result?.authenticated
              ? 'authenticated'
              : 'anonymous'
          )
        } catch {
          if (!cancelled) {
            setAuthState(
              'anonymous'
            )
          }
        }
      }

    checkSession()

    return () => {
      cancelled = true
    }
  }, [])


  // =========================================================
  // CLEANUP
  // =========================================================

  useEffect(() => {
    return () => {
      clearTimers()

      if (toastTimerRef.current) {
        window.clearTimeout(
          toastTimerRef.current
        )
      }
    }
  }, [clearTimers])



  // =========================================================
  // DOCLENS_LOGOUT_V1
  // =========================================================

  const handleLogout = useCallback(
    async () => {
      setAuthBusy(true)
      setAuthError('')

      try {
        await fetch(
          `${API_BASE_URL}/api/auth/logout`,
          {
            method: 'POST',
            credentials: 'include',
          }
        )
      } catch (error) {
        console.error(
          'Logout request error:',
          error
        )
      } finally {
        clearTimers()

        sessionStorage.removeItem(
          'exportflow_analysis'
        )

        setPage('home')
        setPdfFile(null)
        setAnalyzed(false)
        setAnalysisResult(null)
        setManualEdits({})
        setProgress(0)
        setStatus('')
        setAuthError('')
        setAuthState('anonymous')
        setAuthBusy(false)

        window.scrollTo(
          0,
          0
        )
      }
    },
    [
      clearTimers,
    ]
  )


  // =========================================================
  // AUTHENTICATION GATE
  // Existing HomePage/ViewerPage remain below unchanged.
  // =========================================================

  if (
    authState === 'checking'
  ) {
    return (
      <LoginPage
        checking
        busy={false}
        error=""
        onLogin={handleLogin}
      />
    )
  }


  if (
    authState !==
    'authenticated'
  ) {
    return (
      <LoginPage
        checking={false}
        busy={authBusy}
        error={authError}
        onLogin={handleLogin}
      />
    )
  }


  // =========================================================
  // UI
  // =========================================================

  return (
    <>
      {page === 'home' ? (
        <HomePage
          pdfFile={pdfFile}
          progress={progress}
          status={status}
          onFileChange={handleFileChange}
          onAnalyze={handleAnalyze}
          onGenerate={handleGenerate}
        />
      ) : (
        <ViewerPage
          onLogout={handleLogout}
          onBack={handleBack}
          onGoBack={handleBack}
          goBack={handleBack}

          pdfFile={pdfFile}

          analysisResult={analysisResult}

          documentData={finalDocumentData}

          manualEdits={manualEdits}

          getLatestManualEdits={
            getLatestManualEdits
          }

          onFieldChange={handleFieldChange}

          onLineItemChange={handleLineItemChange}

          showToast={showToast}
        />
      )}

      <div
        id="toast"
        className="toast"
        style={{
          display: toastMessage
            ? 'block'
            : 'none',
        }}
      >
        {toastMessage}
      </div>
    </>
  )
}
