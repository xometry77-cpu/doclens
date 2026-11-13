import {
  useState,
} from 'react'


export default function LoginPage({
  checking = false,
  busy = false,
  error = '',
  onLogin,
}) {
  const [email, setEmail] =
    useState('')

  const [
    password,
    setPassword,
  ] = useState('')

  const [
    showPassword,
    setShowPassword,
  ] = useState(false)


  const handleSubmit = (
    event
  ) => {
    event.preventDefault()

    if (
      checking ||
      busy
    ) {
      return
    }

    const safeEmail =
      email.trim()

    if (
      !safeEmail ||
      !password
    ) {
      return
    }

    onLogin?.({
      email: safeEmail,
      password,
    })
  }


  return (
    <main
      className="doclensLoginPage"
    >
      <style>
        {`
          html,
          body,
          #root {
            margin: 0;
            min-height: 100%;
          }

          .doclensLoginPage {
            min-height: 100vh;
            box-sizing: border-box;

            display: grid;
            place-items: center;

            padding: 28px;

            background:
              linear-gradient(
                145deg,
                #58adf3 0%,
                #69bbf5 100%
              );

            color: #10263e;
          }


          .doclensLoginCard {
            width:
              min(
                100%,
                430px
              );

            box-sizing:
              border-box;

            padding:
              34px 34px 30px;

            border-radius:
              24px;

            background:
              rgba(
                255,
                255,
                255,
                .96
              );

            border:
              1px solid
              rgba(
                255,
                255,
                255,
                .72
              );

            box-shadow:
              0 24px 70px
              rgba(
                23,
                74,
                125,
                .18
              );
          }


          .doclensLoginBrand {
            display: flex;
            align-items: center;
            gap: 13px;

            margin-bottom: 30px;
          }


          .doclensLoginLogo {
            width: 49px;
            height: 49px;

            display: grid;
            place-items: center;

            flex: 0 0 auto;

            border-radius: 14px;

            background:
              #2077e8;

            color: #ffffff;

            font-size: 13px;
            font-weight: 850;

            letter-spacing:
              -.2px;
          }


          .doclensLoginBrandText strong {
            display: block;

            color: #0f2741;

            font-size: 23px;
            font-weight: 800;

            letter-spacing:
              -.7px;
          }


          .doclensLoginBrandText span {
            display: block;

            margin-top: 3px;

            color: #6a7e92;

            font-size: 12px;
          }


          .doclensLoginTitle {
            margin:
              0 0 7px;

            color: #10263e;

            font-size: 28px;
            font-weight: 780;

            letter-spacing:
              -.8px;
          }


          .doclensLoginIntro {
            margin:
              0 0 27px;

            color: #6a7e92;

            font-size: 14px;
            line-height: 1.55;
          }


          .doclensLoginForm {
            display: grid;
            gap: 18px;
          }


          .doclensLoginField {
            display: grid;
            gap: 7px;
          }


          .doclensLoginField label {
            color: #29445e;

            font-size: 13px;
            font-weight: 700;
          }


          .doclensLoginField input {
            width: 100%;
            height: 48px;

            box-sizing:
              border-box;

            padding:
              0 14px;

            border:
              1px solid
              #d3dfeb;

            border-radius:
              11px;

            outline: none;

            background:
              #f9fbfd;

            color:
              #10263e;

            font:
              inherit;

            transition:
              border-color .15s ease,
              box-shadow .15s ease,
              background .15s ease;
          }


          .doclensLoginField input:focus {
            background:
              #ffffff;

            border-color:
              #4a9ff0;

            box-shadow:
              0 0 0 3px
              rgba(
                74,
                159,
                240,
                .14
              );
          }


          .doclensPasswordWrap {
            position: relative;
          }


          .doclensPasswordWrap input {
            padding-right:
              76px;
          }


          .doclensPasswordToggle {
            position: absolute;

            right: 8px;
            top: 50%;

            transform:
              translateY(-50%);

            border: 0;

            padding:
              7px 9px;

            border-radius:
              8px;

            background:
              transparent;

            color:
              #3b72a8;

            cursor: pointer;

            font-size: 12px;
            font-weight: 700;
          }


          .doclensLoginError {
            margin:
              -5px 0 0;

            padding:
              10px 12px;

            border-radius:
              10px;

            background:
              #fff1f1;

            color:
              #a72d2d;

            font-size: 13px;
            line-height: 1.4;
          }


          .doclensLoginButton {
            height: 50px;

            margin-top: 3px;

            border: 0;

            border-radius:
              12px;

            background:
              #176fdc;

            color:
              #ffffff;

            cursor: pointer;

            font-size: 14px;
            font-weight: 760;

            transition:
              transform .15s ease,
              background .15s ease,
              opacity .15s ease;
          }


          .doclensLoginButton:hover:not(:disabled) {
            background:
              #1164c8;

            transform:
              translateY(-1px);
          }


          .doclensLoginButton:disabled {
            cursor:
              not-allowed;

            opacity:
              .58;
          }


          .doclensLoginChecking {
            min-height: 130px;

            display: grid;
            place-items: center;

            color:
              #648099;

            text-align: center;

            font-size: 14px;
          }


          .doclensLoginFooter {
            margin:
              25px 0 0;

            color:
              #91a0ae;

            text-align: center;

            font-size: 11px;
          }


          @media (
            max-width: 520px
          ) {
            .doclensLoginPage {
              padding: 18px;
            }

            .doclensLoginCard {
              padding:
                27px 22px 24px;

              border-radius:
                20px;
            }

            .doclensLoginTitle {
              font-size:
                25px;
            }
          }
        `}
      </style>


      <section
        className="doclensLoginCard"
        aria-labelledby="doclensLoginTitle"
      >
        <div
          className="doclensLoginBrand"
        >
          <div
            className="doclensLoginLogo"
            aria-hidden="true"
          >
            DL
          </div>

          <div
            className="doclensLoginBrandText"
          >
            <strong>
              DocLens
            </strong>

            <span>
              Invoice-to-Export Documentation
            </span>
          </div>
        </div>


        {
          checking
            ? (
              <div
                className="doclensLoginChecking"
                role="status"
              >
                Securing your workspace...
              </div>
            )
            : (
              <>
                <h1
                  id="doclensLoginTitle"
                  className="doclensLoginTitle"
                >
                  Sign in
                </h1>

                <p
                  className="doclensLoginIntro"
                >
                  Enter your authorized DocLens
                  credentials to continue.
                </p>


                <form
                  className="doclensLoginForm"
                  onSubmit={handleSubmit}
                >
                  <div
                    className="doclensLoginField"
                  >
                    <label
                      htmlFor="doclensEmail"
                    >
                      Email
                    </label>

                    <input
                      id="doclensEmail"
                      name="email"
                      type="email"
                      autoComplete="username"
                      inputMode="email"
                      value={email}
                      onChange={(
                        event
                      ) =>
                        setEmail(
                          event.target.value
                        )
                      }
                      disabled={busy}
                      required
                    />
                  </div>


                  <div
                    className="doclensLoginField"
                  >
                    <label
                      htmlFor="doclensPassword"
                    >
                      Password
                    </label>

                    <div
                      className="doclensPasswordWrap"
                    >
                      <input
                        id="doclensPassword"
                        name="password"
                        type={
                          showPassword
                            ? 'text'
                            : 'password'
                        }
                        autoComplete="current-password"
                        value={password}
                        onChange={(
                          event
                        ) =>
                          setPassword(
                            event.target.value
                          )
                        }
                        disabled={busy}
                        required
                      />

                      <button
                        className="doclensPasswordToggle"
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (current) =>
                              !current
                          )
                        }
                        disabled={busy}
                        aria-label={
                          showPassword
                            ? 'Hide password'
                            : 'Show password'
                        }
                      >
                        {
                          showPassword
                            ? 'Hide'
                            : 'Show'
                        }
                      </button>
                    </div>
                  </div>


                  {
                    error
                      ? (
                        <p
                          className="doclensLoginError"
                          role="alert"
                        >
                          {error}
                        </p>
                      )
                      : null
                  }


                  <button
                    className="doclensLoginButton"
                    type="submit"
                    disabled={
                      busy ||
                      !email.trim() ||
                      !password
                    }
                  >
                    {
                      busy
                        ? 'Signing in...'
                        : 'Sign in'
                    }
                  </button>
                </form>
              </>
            )
        }


        <p
          className="doclensLoginFooter"
        >
          Authorized access only
        </p>
      </section>
    </main>
  )
}
