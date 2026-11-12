import { useEffect, useRef } from 'react'
export default function HomePage({
  pdfFile,
  progress,
  status,
  onFileChange,
  onAnalyze,
  onGenerate,
}) {
  const openPicker = () => {
    document
      .getElementById('pdf')
      ?.click()
  }


  // DOCLENS_AUTO_PREVIEW_V2

  const docLensAutoPreviewRef = useRef(false)

  const docLensSawFreshProgressRef = useRef(false)


  const handleDocLensAnalyze = async () => {

    docLensAutoPreviewRef.current = true

    docLensSawFreshProgressRef.current =

      Number(progress || 0) < 100


    try {

      await onAnalyze()

    } catch (error) {

      docLensAutoPreviewRef.current = false

      docLensSawFreshProgressRef.current = false

      throw error

    }

  }


  useEffect(() => {

    if (!docLensAutoPreviewRef.current) {

      return

    }


    const currentProgress =

      Number(progress || 0)


    if (currentProgress < 100) {

      docLensSawFreshProgressRef.current = true

    }


    if (

      docLensSawFreshProgressRef.current &&

      currentProgress >= 100

    ) {

      docLensAutoPreviewRef.current = false

      docLensSawFreshProgressRef.current = false


      onGenerate()

    }

  }, [

    progress,

    onGenerate,

  ])


  const handleUploadKeyDown = (
    event
  ) => {
    if (
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault()
      openPicker()
    }
  }

  return (
    <>
      <style>
        {`
          /* =====================================================
             DOCPORT HOME PAGE
             ===================================================== */

          .docportHome {
            position: relative;
            min-height: 100vh;
            overflow: hidden;
            isolation: isolate;
          
            background-color: #216FDE !important;
}


          /* =====================================================
             AMBIENT BACKGROUND
             ===================================================== */

          .docportHome::before {
            content: "";
            position: fixed;
            width: 460px;
            height: 460px;
            left: -170px;
            top: 15%;
            border-radius: 50%;
            background:
              #216FDE !important;
            filter: blur(8px);
            pointer-events: none;
            z-index: -2;
            animation:
              docportOrbOne
              11s
              ease-in-out
              infinite;
          }

          .docportHome::after {
            content: "";
            position: fixed;
            width: 520px;
            height: 520px;
            right: -220px;
            bottom: -190px;
            border-radius: 50%;
            background:
              radial-gradient(
                circle,
                rgba(119, 76, 255, .12),
                transparent 68%
              );
            pointer-events: none;
            z-index: -2;
            animation:
              docportOrbTwo
              13s
              ease-in-out
              infinite;
          }


          @keyframes docportOrbOne {
            0%,
            100% {
              transform:
                translate3d(
                  0,
                  0,
                  0
                );
            }

            50% {
              transform:
                translate3d(
                  45px,
                  -28px,
                  0
                );
            }
          }


          @keyframes docportOrbTwo {
            0%,
            100% {
              transform:
                translate3d(
                  0,
                  0,
                  0
                );
            }

            50% {
              transform:
                translate3d(
                  -45px,
                  -35px,
                  0
                );
            }
          }


          /* =====================================================
             TOP BRAND
             ===================================================== */

          .docportTop {
            animation:
              docportTopEnter
              .7s
              cubic-bezier(
                .22,
                1,
                .36,
                1
              )
              both;
          }


          .docportBrand {
            display: flex;
            align-items: center;
            gap: 15px;
          }


          .docportLogo {
            position: relative;
            display: grid;
            place-items: center;
            overflow: hidden;
            font-size: 15px;
            font-weight: 850;
            letter-spacing: -.5px;
            box-shadow:
              0 16px 38px
              rgba(
                72,
                96,
                255,
                .18
              );
            transition:
              transform .3s ease,
              box-shadow .3s ease;
          }


          .docportLogo::before {
            content: "";
            position: absolute;
            width: 38%;
            height: 160%;
            top: -30%;
            left: -70%;
            transform:
              rotate(18deg);
            background:
              rgba(
                255,
                255,
                255,
                .32
              );
            filter:
              blur(5px);
            animation:
              docportLogoShine
              5.5s
              ease-in-out
              infinite;
          }


          .docportBrand:hover
          .docportLogo {
            transform:
              translateY(-3px)
              rotate(-2deg);
            box-shadow:
              0 20px 46px
              rgba(
                72,
                96,
                255,
                .28
              );
          }


          .docportBrand h2 {
            margin: 0;
            font-size: 23px;
            font-weight: 820;
            letter-spacing: -.5px;
          }


          .docportBrand small {
            display: block;
            margin-top: 4px;
            opacity: .72;
            font-size: 12px;
            letter-spacing: .01em;
          }


          @keyframes docportLogoShine {
            0%,
            60% {
              left: -70%;
            }

            82%,
            100% {
              left: 145%;
            }
          }


          /* =====================================================
             HERO
             ===================================================== */

          .docportHero {
            position: relative;
            animation:
              docportHeroEnter
              .8s
              .08s
              cubic-bezier(
                .22,
                1,
                .36,
                1
              )
              both;
          }


          .docportEyebrow {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            letter-spacing: .19em;
          }


          .docportEyebrow::before,
          .docportEyebrow::after {
            content: "";
            width: 20px;
            height: 1px;
            background:
              currentColor;
            opacity: .5;
          }


          .docportHero h1 {
            letter-spacing: -2.4px;
          }


          .docportHero h1
          .docportAccent {
            position: relative;
            color: #7697ff;
          }


          .docportHero h1
          .docportAccent::after {
            content: "";
            position: absolute;
            left: 4%;
            right: 4%;
            bottom: -8px;
            height: 2px;
            border-radius: 10px;
            background:
              linear-gradient(
                90deg,
                transparent,
                rgba(
                  105,
                  128,
                  255,
                  .8
                ),
                transparent
              );
            transform:
              scaleX(0);
            transform-origin:
              center;
            animation:
              docportUnderline
              .8s
              .8s
              ease
              forwards;
          }


          .docportHero p {
            max-width: 810px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.7;
          }


          @keyframes docportUnderline {
            to {
              transform:
                scaleX(1);
            }
          }


          /* =====================================================
             WORKFLOW CONTAINER
             ===================================================== */

          .docportFlow {
            position: relative;
            overflow: hidden;
            animation:
              docportFlowEnter
              .85s
              .18s
              cubic-bezier(
                .22,
                1,
                .36,
                1
              )
              both;
          }


          .docportFlow::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            border-radius: inherit;
            background:
              linear-gradient(
                110deg,
                transparent 0%,
                rgba(
                  255,
                  255,
                  255,
                  .02
                ) 40%,
                rgba(
                  255,
                  255,
                  255,
                  .045
                ) 50%,
                rgba(
                  255,
                  255,
                  255,
                  .02
                ) 60%,
                transparent 100%
              );
            transform:
              translateX(-100%);
            animation:
              docportPanelShine
              8s
              ease-in-out
              infinite;
          }


          @keyframes docportPanelShine {
            0%,
            65% {
              transform:
                translateX(-100%);
            }

            90%,
            100% {
              transform:
                translateX(100%);
            }
          }


          /* =====================================================
             UPLOAD CARD
             ===================================================== */

          .docportUpload {
            position: relative;
            overflow: hidden;
            transition:
              transform .28s ease,
              border-color .28s ease,
              box-shadow .28s ease,
              background .28s ease;
          }


          .docportUpload:hover {
            transform:
              translateY(-5px);
            border-color:
              rgba(
                65,
                132,
                255,
                .92
              );
            box-shadow:
              0 20px 55px
              rgba(
                0,
                0,
                0,
                .16
              );
          }


          .docportUpload::after {
            content: "";
            position: absolute;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            left: -90px;
            bottom: -95px;
            background:
              rgba(
                54,
                126,
                255,
                .08
              );
            transition:
              transform .45s ease;
          }


          .docportUpload:hover::after {
            transform:
              scale(1.5);
          }


          .docportFileIcon {
            transition:
              transform .28s ease,
              box-shadow .28s ease;
          }


          .docportUpload:hover
          .docportFileIcon {
            transform:
              translateY(-4px)
              rotate(-3deg);
            box-shadow:
              0 14px 32px
              rgba(
                0,
                0,
                0,
                .16
              );
          }


          .docportUploadText {
            position: relative;
            z-index: 2;
            min-width: 0;
          }


          .docportUploadText b {
            display: block;
          }


          .docportUploadText span {
            display: block;
          }


          .docportFilename {
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: 7px;
          }


          .docportFilename.selected::before {
            content: "";
            width: 6px;
            height: 6px;
            flex: 0 0 6px;
            border-radius: 50%;
            background:
              #46e7b1;
            box-shadow:
              0 0 10px
              rgba(
                70,
                231,
                177,
                .7
              );
          }


          .docportUploadArrow {
            position: relative;
            z-index: 2;
            margin-left: auto;
            font-size: 22px;
            opacity: 0;
            transform:
              translateX(-8px);
            transition:
              opacity .25s ease,
              transform .25s ease;
          }


          .docportUpload:hover
          .docportUploadArrow {
            opacity: .8;
            transform:
              translateX(0);
          }


          /* =====================================================
             ACTION BUTTONS
             ===================================================== */

          .docportAction {
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 13px;
            transition:
              transform .28s ease,
              border-color .28s ease,
              box-shadow .28s ease,
              background .28s ease;
          }


          .docportAction:hover {
            transform:
              translateY(-5px);
            border-color:
              rgba(
                89,
                126,
                255,
                .55
              );
            box-shadow:
              0 20px 55px
              rgba(
                0,
                0,
                0,
                .16
              );
          }


          .docportAction::before {
            content: "";
            position: absolute;
            top: -30%;
            left: -95px;
            width: 52px;
            height: 165%;
            transform:
              rotate(16deg);
            background:
              linear-gradient(
                90deg,
                transparent,
                rgba(
                  255,
                  255,
                  255,
                  .12
                ),
                transparent
              );
            transition:
              left .65s ease;
          }


          .docportAction:hover::before {
            left:
              calc(
                100% + 60px
              );
          }


          .docportActionIcon {
            position: relative;
            z-index: 2;
            display: grid;
            place-items: center;
            font-size: 20px;
            transition:
              transform .28s ease;
          }


          .docportAction:hover
          .docportActionIcon {
            transform:
              scale(1.14)
              rotate(-5deg);
          }


          .docportActionContent {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            gap: 5px;
            text-align: left;
          }


          .docportActionContent strong {
            font-size: 17px;
          }


          .docportActionContent small {
            font-size: 11px;
            opacity: .55;
            font-weight: 500;
          }


          .docportActionArrow {
            position: relative;
            z-index: 2;
            font-size: 20px;
            opacity: 0;
            transform:
              translateX(-8px);
            transition:
              opacity .25s ease,
              transform .25s ease;
          }


          .docportAction:hover
          .docportActionArrow {
            opacity: .75;
            transform:
              translateX(0);
          }


          /* =====================================================
             PROGRESS AREA
             ===================================================== */

          .docportProgressWrap {
            animation:
              docportStatusEnter
              .4s
              ease
              both;
          }


          .docportProgressWrap
          .progress {
            overflow: hidden;
          }


          .docportProgressWrap
          .progress i {
            position: relative;
            overflow: hidden;
            transition:
              width
              .45s
              cubic-bezier(
                .22,
                1,
                .36,
                1
              );
          }


          .docportProgressWrap
          .progress i::after {
            content: "";
            position: absolute;
            inset: 0;
            background:
              linear-gradient(
                90deg,
                transparent,
                rgba(
                  255,
                  255,
                  255,
                  .36
                ),
                transparent
              );
            transform:
              translateX(-100%);
            animation:
              docportProgressSweep
              1.8s
              linear
              infinite;
          }


          @keyframes docportProgressSweep {
            to {
              transform:
                translateX(100%);
            }
          }


          /* =====================================================
             SMALL FOOTER
             ===================================================== */

          .docportCapabilities {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: 9px;
            margin-top: 22px;
            font-size: 10.5px;
            letter-spacing: .045em;
            opacity: .38;
            animation:
              docportHeroEnter
              .8s
              .3s
              ease
              both;
          }


          .docportCapabilities i {
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background:
              currentColor;
            opacity: .6;
          }


          /* =====================================================
             ENTRY ANIMATIONS
             ===================================================== */

          @keyframes docportTopEnter {
            from {
              opacity: 0;
              transform:
                translateY(-14px);
            }

            to {
              opacity: 1;
              transform:
                translateY(0);
            }
          }


          @keyframes docportHeroEnter {
            from {
              opacity: 0;
              transform:
                translateY(18px);
            }

            to {
              opacity: 1;
              transform:
                translateY(0);
            }
          }


          @keyframes docportFlowEnter {
            from {
              opacity: 0;
              transform:
                translateY(22px)
                scale(.985);
            }

            to {
              opacity: 1;
              transform:
                translateY(0)
                scale(1);
            }
          }


          @keyframes docportStatusEnter {
            from {
              opacity: 0;
              transform:
                translateY(6px);
            }

            to {
              opacity: 1;
              transform:
                translateY(0);
            }
          }


          /* =====================================================
             MOBILE
             ===================================================== */

          @media (
            max-width: 850px
          ) {
            .docportHero h1 {
              letter-spacing:
                -1.2px;
            }

            .docportAction {
              justify-content:
                flex-start;
              padding-left:
                25px;
            }

            .docportActionArrow,
            .docportUploadArrow {
              margin-left: auto;
              opacity: .65;
              transform: none;
            }

            .docportCapabilities {
              padding:
                0 16px 22px;
            }
          }


          /* =====================================================
             ACCESSIBILITY
             ===================================================== */

          @media (
            prefers-reduced-motion:
            reduce
          ) {
            .docportHome *,
            .docportHome *::before,
            .docportHome *::after {
              animation-duration:
                .001ms !important;

              animation-iteration-count:
                1 !important;

              transition-duration:
                .001ms !important;
            }
          }
        

          /* =====================================================
             DOCLENS_COMPANY_REDESIGN_V1
             Visual-only redesign.
             Functional workflow is intentionally untouched.
             ===================================================== */

          .docportHome {
            min-height: 100vh;
            background:
              linear-gradient(
                135deg,
                #07111f 0%,
                #0a1727 45%,
                #0d1b2c 100%
              );
          }


          .docportHome::before {
            width: 560px;
            height: 560px;
            left: auto;
            right: -190px;
            top: -170px;
            background:
              radial-gradient(
                circle,
                rgba(72, 187, 255, .11),
                transparent 69%
              );
            filter: blur(2px);
            animation: none;
          }


          .docportHome::after {
            width: 460px;
            height: 460px;
            right: auto;
            left: -180px;
            bottom: -190px;
            background:
              radial-gradient(
                circle,
                rgba(31, 199, 168, .08),
                transparent 70%
              );
            animation: none;
          }


          .docportTop {
            width: min(1420px, calc(100% - 64px));
            margin: 0 auto;
            padding-top: 34px;
          }


          .docportBrand {
            gap: 13px;
          }


          .docportLogo {
            width: 52px;
            height: 52px;
            border-radius: 16px;
            background:
              linear-gradient(
                145deg,
                #1ea7ff,
                #2866ff
              );
            border:
              1px solid
              rgba(255, 255, 255, .15);
            box-shadow:
              0 14px 38px
              rgba(0, 111, 255, .22);
            color: #ffffff;
            font-size: 14px;
            font-weight: 900;
            letter-spacing: -.4px;
          }


          .docportLogo::before {
            content: "";
            position: absolute;
            width: 19px;
            height: 19px;
            border:
              2px solid
              rgba(255, 255, 255, .9);
            border-radius: 50%;
            opacity: .22;
          }


          .docportLogo::after {
            content: "";
            position: absolute;
            width: 8px;
            height: 2px;
            right: 10px;
            bottom: 12px;
            background:
              rgba(255, 255, 255, .85);
            transform: rotate(45deg);
            border-radius: 999px;
            opacity: .35;
          }


          .docportBrand strong,
          .docportBrand b {
            font-size: 25px;
            letter-spacing: -.8px;
          }


          .docportBrand small,
          .docportBrand span {
            letter-spacing: .1px;
          }


          /* -----------------------------------------------------
             Main split workspace
             ----------------------------------------------------- */

          .docportHome main,
          .docportHome .main,
          .docportHome .homeMain {
            width:
              min(
                1420px,
                calc(100% - 64px)
              );
            margin: 0 auto;
          }


          .docportHero {
            text-align: left !important;
            max-width: 660px !important;
            margin:
              0 !important;
          }


          .docportEyebrow {
            justify-content: flex-start !important;
            color: #60c3ff !important;
            letter-spacing: .17em !important;
          }


          .docportEyebrow::before {
            background: #27b4ff !important;
          }


          .docportHero h1 {
            max-width: 660px;
            font-size:
              clamp(
                48px,
                5vw,
                76px
              ) !important;
            line-height: .98 !important;
            letter-spacing: -3.2px !important;
            margin-top: 18px !important;
            margin-bottom: 22px !important;
          }


          .docportHero h1 span {
            color: #59bbff !important;
          }


          .docportHero p {
            max-width: 610px !important;
            margin:
              0 !important;
            font-size: 17px !important;
            line-height: 1.75 !important;
            color: #8da2ba !important;
          }


          /* -----------------------------------------------------
             Workflow panel
             ----------------------------------------------------- */

          .steps {
            position: relative;
            display: grid !important;
            grid-template-columns:
              minmax(0, 1.2fr)
              minmax(270px, .8fr) !important;
            gap: 18px !important;
            width: 100%;
            max-width: 760px;
            margin-left: auto;
            padding: 18px !important;
            border-radius: 28px !important;
            background:
              rgba(14, 31, 51, .82) !important;
            border:
              1px solid
              rgba(124, 165, 204, .15) !important;
            box-shadow:
              0 28px 80px
              rgba(0, 0, 0, .28) !important;
            backdrop-filter: blur(16px);
          }


          .steps::before {
            content: "DOCUMENT WORKSPACE";
            position: absolute;
            left: 22px;
            top: -34px;
            color: #627b95;
            font-size: 10px;
            font-weight: 750;
            letter-spacing: .18em;
          }


          .docportUpload {
            min-height: 230px !important;
            border-radius: 20px !important;
            border:
              1px dashed
              rgba(54, 171, 255, .48) !important;
            background:
              linear-gradient(
                145deg,
                rgba(25, 56, 88, .72),
                rgba(17, 39, 64, .76)
              ) !important;
            transition:
              transform .2s ease,
              border-color .2s ease,
              background .2s ease !important;
          }


          .docportUpload:hover {
            transform: translateY(-2px);
            border-color:
              rgba(68, 190, 255, .8) !important;
            background:
              linear-gradient(
                145deg,
                rgba(27, 65, 102, .86),
                rgba(17, 43, 72, .9)
              ) !important;
          }


          .docportFileIcon {
            width: 68px !important;
            height: 68px !important;
            border-radius: 18px !important;
            background:
              rgba(36, 123, 212, .19) !important;
            color: #73c9ff !important;
          }


          .docportUploadText b {
            font-size: 18px !important;
            line-height: 1.35 !important;
          }


          .docportUploadText span {
            color: #8499ae !important;
          }


          .docportFilename {
            margin-top: 13px !important;
          }


          .docportAction {
            min-height: 230px !important;
            border-radius: 20px !important;
            border:
              1px solid
              rgba(54, 171, 255, .22) !important;
            background:
              linear-gradient(
                160deg,
                rgba(22, 47, 76, .94),
                rgba(13, 32, 54, .96)
              ) !important;
            transition:
              transform .2s ease,
              border-color .2s ease,
              box-shadow .2s ease !important;
          }


          .docportAction:hover {
            transform: translateY(-3px);
            border-color:
              rgba(65, 182, 255, .62) !important;
            box-shadow:
              0 18px 42px
              rgba(0, 112, 220, .12);
          }


          .docportActionIcon {
            color: #6fc9ff !important;
            font-size: 23px !important;
          }


          .docportActionContent strong {
            font-size: 19px !important;
          }


          .docportActionContent small {
            margin-top: 6px;
            color: #8398ad !important;
          }


          .docportActionArrow {
            position: absolute;
            right: 22px;
            bottom: 22px;
            width: 38px;
            height: 38px;
            display: grid;
            place-items: center;
            border-radius: 12px;
            background:
              rgba(47, 151, 232, .12);
            color: #82d0ff;
          }


          /* -----------------------------------------------------
             Progress
             ----------------------------------------------------- */

          .docportProgressWrap {
            max-width: 760px !important;
            margin-left: auto !important;
            margin-right: 0 !important;
            margin-top: 18px !important;
            padding: 14px 16px !important;
            border-radius: 16px !important;
            background:
              rgba(12, 28, 46, .74) !important;
            border:
              1px solid
              rgba(118, 157, 196, .12) !important;
          }


          .progress {
            overflow: hidden;
            border-radius: 999px;
          }


          /* -----------------------------------------------------
             Feature/footer strip
             ----------------------------------------------------- */

          .docportHome footer,
          .docportHome .features,
          .docportHome .docportFeatures {
            color: #71859a !important;
          }


          /* -----------------------------------------------------
             Large-screen split placement
             ----------------------------------------------------- */

          @media (min-width: 1050px) {

            .docportHome main,
            .docportHome .main,
            .docportHome .homeMain {
              min-height:
                calc(
                  100vh - 150px
                );
              display: grid;
              grid-template-columns:
                minmax(0, .82fr)
                minmax(620px, 1.18fr);
              align-items: center;
              gap: 70px;
              padding-bottom: 70px;
            }

          }


          /* -----------------------------------------------------
             Tablet/mobile
             ----------------------------------------------------- */

          @media (max-width: 1049px) {

            .docportTop {
              width:
                min(
                  100% - 36px,
                  900px
                );
            }

            .docportHome main,
            .docportHome .main,
            .docportHome .homeMain {
              width:
                min(
                  100% - 36px,
                  900px
                );
            }

            .docportHero {
              margin:
                80px auto 55px !important;
              text-align: center !important;
            }

            .docportEyebrow {
              justify-content:
                center !important;
            }

            .docportHero p {
              margin:
                0 auto !important;
            }

            .steps {
              margin:
                0 auto !important;
            }

            .docportProgressWrap {
              margin:
                18px auto 0 !important;
            }

          }


          @media (max-width: 700px) {

            .docportTop {
              padding-top: 22px;
            }

            .docportLogo {
              width: 46px;
              height: 46px;
              border-radius: 14px;
            }

            .docportHero {
              margin-top:
                56px !important;
            }

            .docportHero h1 {
              font-size:
                clamp(
                  40px,
                  12vw,
                  58px
                ) !important;
              letter-spacing:
                -2px !important;
            }

            .steps {
              grid-template-columns:
                1fr !important;
              padding: 12px !important;
              border-radius: 22px !important;
            }

            .docportUpload,
            .docportAction {
              min-height:
                190px !important;
            }

            .steps::before {
              display: none;
            }

          }



          /* =====================================================
             DOCLENS_CLEAN_UI_V2
             Visual-only override.
             Functional flow remains unchanged.
             ===================================================== */

          .docportHome {
            min-height: 100vh !important;
            background: #081321 !important;
            overflow-x: hidden !important;
          }


          /* Remove old decorative orbs */

          .docportHome::before,
          .docportHome::after {
            display: none !important;
          }


          /* =====================================================
             HEADER
             ===================================================== */

          .docportTop {
            width: min(1120px, calc(100% - 48px)) !important;
            margin: 0 auto !important;
            padding-top: 34px !important;
          }


          .docportBrand {
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
          }


          .docportLogo {
            width: 46px !important;
            height: 46px !important;
            min-width: 46px !important;
            border-radius: 12px !important;

            background: #1976e9 !important;

            border:
              1px solid
              rgba(255,255,255,.12) !important;

            box-shadow: none !important;

            font-size: 13px !important;
            font-weight: 800 !important;

            color: #ffffff !important;
          }


          .docportLogo::before,
          .docportLogo::after {
            display: none !important;
          }


          .docportBrand strong,
          .docportBrand b {
            font-size: 22px !important;
            font-weight: 750 !important;
            letter-spacing: -.4px !important;
          }


          .docportBrand small,
          .docportBrand span {
            color: #71849a !important;
            font-size: 12px !important;
          }


          /* =====================================================
             MAIN
             ===================================================== */

          .docportHome main,
          .docportHome .main,
          .docportHome .homeMain {
            width: min(1040px, calc(100% - 48px)) !important;

            min-height: auto !important;

            display: block !important;

            margin: 0 auto !important;

            padding:
              105px
              0
              70px !important;
          }


          /* =====================================================
             HERO
             ===================================================== */

          .docportHero {
            max-width: 760px !important;

            margin:
              0 auto
              52px !important;

            text-align: center !important;
          }


          .docportEyebrow {
            display: none !important;
          }


          .docportHero h1 {
            max-width: none !important;

            margin:
              0
              auto
              20px !important;

            font-size:
              clamp(
                42px,
                5vw,
                62px
              ) !important;

            line-height: 1.06 !important;

            letter-spacing:
              -2.2px !important;

            text-align:
              center !important;

            white-space:
              normal !important;

            color:
              #f4f7fb !important;
          }


          .docportHero h1 span {
            color:
              #428bf5 !important;
          }


          .docportHero p {
            max-width: 650px !important;

            margin:
              0 auto !important;

            font-size:
              16px !important;

            line-height:
              1.65 !important;

            text-align:
              center !important;

            color:
              #8597ab !important;
          }


          /* =====================================================
             WORKFLOW
             ===================================================== */

          .steps {
            position: relative !important;

            width: 100% !important;
            max-width: 900px !important;

            margin:
              0 auto !important;

            display:
              grid !important;

            grid-template-columns:
              repeat(
                2,
                minmax(0, 1fr)
              ) !important;

            gap:
              16px !important;

            padding:
              16px !important;

            border-radius:
              20px !important;

            background:
              #0d1c2d !important;

            border:
              1px solid
              #1d3044 !important;

            box-shadow:
              none !important;

            backdrop-filter:
              none !important;
          }


          .steps::before,
          .steps::after {
            display: none !important;
          }


          /* =====================================================
             UPLOAD CARD
             ===================================================== */

          .docportUpload {
            min-height: 190px !important;

            border-radius:
              14px !important;

            border:
              1px dashed
              #315374 !important;

            background:
              #102337 !important;

            box-shadow:
              none !important;

            transform:
              none !important;
          }


          .docportUpload:hover {
            border-color:
              #4086cb !important;

            background:
              #12273d !important;

            transform:
              none !important;
          }


          .docportFileIcon {
            width: 56px !important;
            height: 56px !important;

            border-radius:
              12px !important;

            background:
              #173b61 !important;

            color:
              #64b6f3 !important;
          }


          .docportUploadText b {
            font-size:
              17px !important;

            line-height:
              1.3 !important;

            color:
              #eef4fa !important;
          }


          .docportUploadText span {
            font-size:
              13px !important;

            color:
              #8396aa !important;
          }


          .docportFilename {
            margin-top:
              10px !important;

            font-size:
              13px !important;
          }


          .docportUploadArrow {
            display:
              none !important;
          }


          /* =====================================================
             ANALYZE CARD
             ===================================================== */

          .docportAction {
            position:
              relative !important;

            min-height:
              190px !important;

            border-radius:
              14px !important;

            border:
              1px solid
              #263e56 !important;

            background:
              #102337 !important;

            box-shadow:
              none !important;

            transform:
              none !important;
          }


          .docportAction:hover {
            background:
              #132940 !important;

            border-color:
              #347ac0 !important;

            transform:
              none !important;

            box-shadow:
              none !important;
          }


          .docportActionIcon {
            color:
              #59aef1 !important;

            font-size:
              21px !important;
          }


          .docportActionContent strong {
            font-size:
              18px !important;

            color:
              #f1f5f9 !important;
          }


          .docportActionContent small {
            display:
              block !important;

            margin-top:
              5px !important;

            font-size:
              13px !important;

            color:
              #778b9f !important;
          }


          .docportActionArrow {
            position:
              absolute !important;

            right:
              18px !important;

            bottom:
              18px !important;

            width:
              34px !important;

            height:
              34px !important;

            display:
              grid !important;

            place-items:
              center !important;

            border-radius:
              9px !important;

            background:
              #173653 !important;

            color:
              #71baf2 !important;
          }


          /* =====================================================
             PROGRESS
             ===================================================== */

          .docportProgressWrap {
            width:
              100% !important;

            max-width:
              900px !important;

            margin:
              14px auto
              0 !important;

            padding:
              12px 14px !important;

            border-radius:
              12px !important;

            background:
              #0d1c2d !important;

            border:
              1px solid
              #1d3044 !important;
          }


          /* =====================================================
             FOOTER / FEATURE LINE
             ===================================================== */

          .docportFeatures,
          .features {
            margin-top:
              28px !important;

            text-align:
              center !important;

            color:
              #607286 !important;

            font-size:
              11px !important;
          }


          /* =====================================================
             TABLET
             ===================================================== */

          @media (max-width: 820px) {

            .docportTop {
              width:
                min(
                  100% - 32px,
                  720px
                ) !important;
            }


            .docportHome main,
            .docportHome .main,
            .docportHome .homeMain {
              width:
                min(
                  100% - 32px,
                  720px
                ) !important;

              padding-top:
                72px !important;
            }


            .docportHero {
              margin-bottom:
                38px !important;
            }


            .steps {
              grid-template-columns:
                1fr !important;

              max-width:
                600px !important;
            }


            .docportProgressWrap {
              max-width:
                600px !important;
            }

          }


          /* =====================================================
             MOBILE
             ===================================================== */

          @media (max-width: 520px) {

            .docportTop {
              padding-top:
                22px !important;
            }


            .docportLogo {
              width:
                42px !important;

              height:
                42px !important;

              min-width:
                42px !important;
            }


            .docportBrand strong,
            .docportBrand b {
              font-size:
                20px !important;
            }


            .docportHome main,
            .docportHome .main,
            .docportHome .homeMain {
              padding-top:
                55px !important;
            }


            .docportHero h1 {
              font-size:
                40px !important;

              letter-spacing:
                -1.5px !important;
            }


            .docportHero p {
              font-size:
                14px !important;
            }


            .steps {
              padding:
                10px !important;

              border-radius:
                16px !important;
            }


            .docportUpload,
            .docportAction {
              min-height:
                170px !important;
            }

          }



          /* DOCLENS_FINAL_BLUE_BACKGROUND_V1 */
          .docportHome {
            background: #0E6AED !important;
            background-color: #0E6AED !important;
            background-image: none !important;
          }



          /* DOCLENS_FULL_BLUE_SCREEN_V2 */
          html, body, #root {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            min-height: 100% !important;
            background: #0E6AED !important;
            background-color: #0E6AED !important;
          }

          body {
            overflow-x: hidden !important;
          }

          .docportHome {
            width: 100vw !important;
            min-height: 100vh !important;
            margin: 0 !important;
            background: #0E6AED !important;
            background-color: #0E6AED !important;
            background-image: none !important;
          }

          /* remove unwanted dark outer feel only on page surface */
          .docportHome::before,
          .docportHome::after {
            background: transparent !important;
            opacity: 0 !important;
            display: none !important;
            content: none !important;
          }

          /* visible texts on blue background */
          .docportHome h1,
          .docportHome h2,
          .docportHome h3,
          .docportHome h4,
          .docportHome .hero-title,
          .docportHome .brand-title,
          .docportHome .logoText,
          .docportHome .main-title {
            color: #FFFFFF !important;
          }

          .docportHome .accent,
          .docportHome .highlight,
          .docportHome .hero-title span,
          .docportHome .main-title span {
            color: #D9ECFF !important;
          }

          .docportHome p,
          .docportHome .subtitle,
          .docportHome .brand-subtitle,
          .docportHome .hero-subtitle,
          .docportHome .eyebrow,
          .docportHome .section-label,
          .docportHome .small-text,
          .docportHome .feature-list,
          .docportHome .feature-list span,
          .docportHome .card-subtitle,
          .docportHome .upload-subtitle,
          .docportHome .analyze-subtitle {
            color: rgba(255,255,255,0.92) !important;
          }

          /* keep cards same but ensure text readable */
          .docportHome .upload-card,
          .docportHome .analyze-card,
          .docportHome .action-card {
            color: #FFFFFF !important;
          }

          .docportHome .upload-card p,
          .docportHome .analyze-card p,
          .docportHome .action-card p {
            color: rgba(255,255,255,0.85) !important;
          }

          .docportHome .file-name,
          .docportHome .file-status,
          .docportHome .selected-file-name {
            color: #9FFFD0 !important;
          }



          /* DOCLENS_CENTER_HERO_V1 */

          .docportHero {
            width: 100% !important;
            max-width: 900px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            text-align: center !important;
          }

          .docportHero h1 {
            width: 100% !important;
            max-width: 900px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            text-align: center !important;
          }

          .docportHero p {
            width: 100% !important;
            max-width: 760px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            text-align: center !important;
          }

          .docportEyebrow {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }



          /* DOCLENS_HERO_POSITION_V2 */

          /*
             Center the WHOLE hero against the browser viewport,
             not only against its parent container.
             translateY only changes the visual hero position,
             so cards/layout below remain untouched.
          */

          .docportHero {
            position: relative !important;

            width: 100vw !important;
            max-width: none !important;

            margin-left:
              calc(50% - 50vw) !important;

            margin-right:
              calc(50% - 50vw) !important;

            text-align: center !important;

            transform:
              translateY(55px) !important;

            z-index: 2 !important;
          }


          .docportHero h1 {
            display: block !important;

            width:
              min(
                900px,
                calc(100% - 40px)
              ) !important;

            max-width: 900px !important;

            margin-left:
              auto !important;

            margin-right:
              auto !important;

            text-align:
              center !important;
          }


          .docportHero p {
            display: block !important;

            width:
              min(
                760px,
                calc(100% - 40px)
              ) !important;

            max-width:
              760px !important;

            margin-left:
              auto !important;

            margin-right:
              auto !important;

            text-align:
              center !important;
          }


          .docportEyebrow {
            width: 100% !important;

            justify-content:
              center !important;

            text-align:
              center !important;
          }


          @media (max-width: 700px) {

            .docportHero {
              transform:
                translateY(25px) !important;
            }

          }



          /* =====================================================
             DOCLENS_TRUE_VIEWPORT_CENTER_V1

             Fix the actual root/container width so HomePage
             centers against the browser screen, not a narrowed
             parent container.
             ===================================================== */

          html,
          body {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }


          #root {
            width: 100% !important;
            max-width: none !important;

            margin: 0 !important;
            padding: 0 !important;

            text-align: initial !important;
          }


          .docportHome {
            position: relative !important;

            width: 100% !important;
            max-width: none !important;

            min-height: 100vh !important;

            margin-left: 0 !important;
            margin-right: 0 !important;

            left: auto !important;
            right: auto !important;
          }


          /*
             Header keeps its existing size but is centered
             inside the real browser viewport.
          */

          .docportTop {
            width: min(
              1120px,
              calc(100% - 48px)
            ) !important;

            max-width: 1120px !important;

            margin-left: auto !important;
            margin-right: auto !important;
          }


          /*
             Main homepage content uses the viewport center.
             Existing vertical spacing is intentionally untouched.
          */

          .docportHome main,
          .docportHome .main,
          .docportHome .homeMain {
            width: min(
              1040px,
              calc(100% - 48px)
            ) !important;

            max-width: 1040px !important;

            margin-left: auto !important;
            margin-right: auto !important;
          }


          /*
             Hero/title truly centered.
             Do not alter its vertical transform/spacing.
          */

          .docportHero {
            position: relative !important;

            width: 100% !important;
            max-width: 900px !important;

            margin-left: auto !important;
            margin-right: auto !important;

            left: auto !important;
            right: auto !important;

            text-align: center !important;
          }


          .docportHero h1 {
            width: 100% !important;
            max-width: 900px !important;

            margin-left: auto !important;
            margin-right: auto !important;

            text-align: center !important;
          }


          .docportHero p {
            width: 100% !important;
            max-width: 760px !important;

            margin-left: auto !important;
            margin-right: auto !important;

            text-align: center !important;
          }


          /*
             Keep workflow box centered too.
             Width/design itself is unchanged.
          */

          .steps {
            margin-left: auto !important;
            margin-right: auto !important;
          }


          .docportProgressWrap {
            margin-left: auto !important;
            margin-right: auto !important;
          }



          /* =====================================================
             DOCLENS_BLUE_CARD_REFINEMENT_V1
             Visual-only update.
             Layout and functionality remain untouched.
             ===================================================== */


          /* -----------------------------------------------------
             Brand subtitle visibility
             ----------------------------------------------------- */

          .docportBrand small,
          .docportBrand > div > span,
          .docportBrand span {
            color: #DCEBFF !important;
            opacity: .92 !important;
          }


          /* -----------------------------------------------------
             Small space between hero description and cards
             ----------------------------------------------------- */

          .docportHero {
            margin-bottom: 38px !important;
          }


          /* -----------------------------------------------------
             Main workflow frame
             Replace black appearance with blue-toned panel
             ----------------------------------------------------- */

          .steps {
            background:
              rgba(
                8,
                67,
                164,
                .62
              ) !important;

            border:
              1px solid
              rgba(
                200,
                225,
                255,
                .22
              ) !important;

            box-shadow:
              0 16px 42px
              rgba(
                0,
                46,
                125,
                .22
              ) !important;
          }


          /* -----------------------------------------------------
             Upload card
             ----------------------------------------------------- */

          .docportUpload {
            background:
              rgba(
                10,
                73,
                166,
                .72
              ) !important;

            border:
              1px dashed
              rgba(
                177,
                216,
                255,
                .46
              ) !important;

            box-shadow:
              none !important;
          }


          .docportUpload:hover {
            background:
              rgba(
                15,
                82,
                181,
                .78
              ) !important;

            border-color:
              rgba(
                205,
                232,
                255,
                .65
              ) !important;
          }


          /* -----------------------------------------------------
             Analyze card
             ----------------------------------------------------- */

          .docportAction {
            background:
              rgba(
                10,
                73,
                166,
                .72
              ) !important;

            border:
              1px solid
              rgba(
                177,
                216,
                255,
                .30
              ) !important;

            box-shadow:
              none !important;
          }


          .docportAction:hover {
            background:
              rgba(
                15,
                82,
                181,
                .78
              ) !important;

            border-color:
              rgba(
                205,
                232,
                255,
                .58
              ) !important;

            box-shadow:
              none !important;
          }


          /* -----------------------------------------------------
             Inner upload icon
             ----------------------------------------------------- */

          .docportFileIcon {
            background:
              rgba(
                255,
                255,
                255,
                .12
              ) !important;

            color:
              #DDF1FF !important;

            border:
              1px solid
              rgba(
                255,
                255,
                255,
                .10
              ) !important;
          }


          /* -----------------------------------------------------
             Card text visibility
             ----------------------------------------------------- */

          .docportUploadText b,
          .docportActionContent strong {
            color:
              #FFFFFF !important;
          }


          .docportUploadText span,
          .docportActionContent small {
            color:
              rgba(
                229,
                241,
                255,
                .78
              ) !important;
          }


          .docportFilename {
            color:
              #90FFD1 !important;
          }


          .docportActionIcon {
            color:
              #CBEAFF !important;
          }


          .docportActionArrow {
            background:
              rgba(
                255,
                255,
                255,
                .10
              ) !important;

            color:
              #FFFFFF !important;
          }



          /* DOCLENS_REMOVE_HERO_TITLE_V1 */

          .docportHero {
            transform: none !important;
            margin-bottom: 46px !important;
          }

          .docportHero p {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
            text-align: center !important;
          }



          /* DOCLENS_BRAND_DESCRIPTION_GAP_V1 */

          .docportHero {
            padding-top: 22px !important;
          }



          /* DOCLENS_SKYBLUE_FRAMELESS_V1 */

          body,
          #root,
          .docportHero,
          .doclensHome,
          .doclens-page,
          .doclens-shell,
          .homePage,
          .home-shell {
            background: #5aaeff !important;
            background-image: none !important;
          }

          .docportHero::before,
          .docportHero::after,
          .doclensHome::before,
          .doclensHome::after {
            display: none !important;
            background: none !important;
          }

          .docportBrandSubtitle,
          .doclensBrandSubtitle,
          .docportSubtitle,
          .hero-subtitle {
            color: rgba(255,255,255,0.92) !important;
          }

          .docportHero p,
          .docportHero .description,
          .docportHero .heroDescription,
          .doclensHome p {
            color: rgba(255,255,255,0.96) !important;
          }

          .docportActionRail,
          .docportActionShell,
          .docportPrimaryPanel,
          .doclensActionRail,
          .doclensActionShell,
          .homeActionShell,
          .homeActionWrap,
          .workflow-shell,
          .workflow-frame {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
          }

          .docportActionGrid,
          .docportCardsRow,
          .docportActionPanel,
          .doclensActionGrid,
          .doclensActionPanel,
          .homeActionGrid,
          .homeActionPanel,
          .workflow-grid {
            background: rgba(10, 52, 130, 0.20) !important;
            border: 1px solid rgba(255,255,255,0.18) !important;
            box-shadow: none !important;
          }



          /* =====================================================
             DOCLENS_FINAL_BG_FRAME_FIX_V1

             ONLY:
             1. Full-screen lighter sky-blue background
             2. Remove black workflow outer frame
             3. Keep hero background transparent

             NO layout/spacing/function changes.
             ===================================================== */

          html,
          body,
          #root {
            background: #4AA3F5 !important;
            background-color: #4AA3F5 !important;
            background-image: none !important;
          }


          .docportHome {
            background: #4AA3F5 !important;
            background-color: #4AA3F5 !important;
            background-image: none !important;
          }


          /*
             Previous patch accidentally gave the hero/description
             area its own background. Restore it to transparent.
          */

          .docportHero {
            background: transparent !important;
            background-color: transparent !important;
            background-image: none !important;
          }


          /*
             Remove ONLY the black outer workflow frame.
             Padding, width, gap and positions are NOT changed.
          */

          .docportHome .steps {
            background: transparent !important;
            background-color: transparent !important;
            background-image: none !important;

            border-color: transparent !important;

            box-shadow: none !important;
          }



          /* DOCLENS_REMOVE_OUTER_BLACK_FRAME_V1 */

          /*
             Remove ONLY the wrapper directly surrounding
             the Upload + Analyze .steps section.
          */

          .docportHome *:has(> .steps) {
            background: transparent !important;
            background-color: transparent !important;
            background-image: none !important;

            border: none !important;
            outline: none !important;

            box-shadow: none !important;
          }

          .docportHome *:has(> .steps)::before,
          .docportHome *:has(> .steps)::after {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
          }

`}
      </style>


      <div
        id="homePage"
        className="page active"
      >
        <main
          className="home docportHome"
        >

          {/* ================================================
              TOP BRAND
              ================================================ */}

          <div
            className="top docportTop"
          >
            <div
              className="brand docportBrand"
            >
              <div
                className="logo docportLogo"
              >DL</div>

              <div>
                <h2>DocLens</h2>

                <small>
                  Invoice-to-Export Documentation
                </small>
              </div>
            </div>

            {/*
              Removed:
              Exact 6-sheet Excel configured
            */}
          </div>


          {/* ================================================
              HERO
              ================================================ */}

          <div
            className="hero docportHero"
          >
            <div
              className="eyebrow docportEyebrow"
            >
              INTELLIGENT DOCUMENT PROCESSING
            </div>

            

            <p>
              Convert commercial invoice PDFs into
              structured export documents, review
              extracted shipment data and generate
              a ready-to-use Excel workbook.
            </p>
          </div>


          {/* ================================================
              WORKFLOW
              ================================================ */}

          <section
            className="flow docportFlow"
            aria-label="Export document workflow"
          >
            <div className="steps">


              {/* ============================================
                  UPLOAD
                  ============================================ */}

              <div
                className="upload docportUpload"
                role="button"
                tabIndex={0}
                onClick={
                  openPicker
                }
                onKeyDown={
                  handleUploadKeyDown
                }
              >
                <div
                  className="fileIcon docportFileIcon"
                  aria-hidden="true"
                >
                  <svg
                    width="29"
                    height="29"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                    />

                    <path
                      d="M14 2v6h6"
                    />

                    <path
                      d="M8 13h8"
                    />

                    <path
                      d="M8 17h6"
                    />
                  </svg>
                </div>


                <div
                  className="docportUploadText"
                >
                  <b>
                    Upload Commercial Invoice PDF
                  </b>

                  <span>
                    Choose the commercial invoice you want to process.
                  </span>


                  <div
                    id="pdfName"
                    className={
                      `filename docportFilename${
                        pdfFile
                          ? ' selected'
                          : ''
                      }`
                    }
                  >
                    {
                      pdfFile
                        ? pdfFile.name
                        : 'No PDF selected'
                    }
                  </div>
                </div>


                <span
                  className="docportUploadArrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>


              <input
                id="pdf"
                type="file"
                accept=".pdf,application/pdf"
                hidden
                onChange={(
                  event
                ) =>
                  onFileChange(
                    event
                      .target
                      .files?.[0] ||
                      null
                  )
                }
              />


              {/* ============================================
                  ANALYZE
                  ============================================ */}

              <button
                id="analyzeBtn"
                className="action docportAction"
                type="button"
                onClick={handleDocLensAnalyze}
              >
                <span
                  className="docportActionIcon"
                  aria-hidden="true"
                >
                  ✦
                </span>


                <span
                  className="docportActionContent"
                >
                  <strong>
                    Analyze PDF
                  </strong>

                  <small>
                    Extract and review document data
                  </small>
                </span>


                <span
                  className="docportActionArrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </button>


              


            </div>


            {/* ================================================
                PROGRESS
                ================================================ */}

            <div
              id="progressWrap"
              className="progressWrap docportProgressWrap"
              style={{
                display:
                  progress > 0
                    ? 'block'
                    : 'none',
              }}
            >
              <div
                className="progress"
                aria-label="PDF analysis progress"
              >
                <i
                  id="bar"
                  style={{
                    width:
                      `${progress}%`,
                  }}
                />
              </div>


              <div
                id="status"
                className="status"
              >
                {status}
              </div>
            </div>
          </section>


          {/* ================================================
              SMALL CAPABILITY LINE
              ================================================ */}

          <div
            className="docportCapabilities"
          >
            <span>
              PDF Extraction
            </span>

            <i />

            <span>
              Data Review
            </span>

            <i />

            <span>
              Manual Editing
            </span>

            <i />

            <span>
              Excel Export
            </span>
          </div>

        </main>
      </div>
    </>
  )
}