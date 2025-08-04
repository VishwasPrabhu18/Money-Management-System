package in.vishwasprabhu18.money_manager.constant;

public class HTMLResponses {
    public static final String ACCOUNT_ACTIVATION_SUCCESS = """
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="utf-8" />
                <title>Activation Success</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <style>
                  body {
                    margin: 0;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
                    background: #f0f4f8;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                  }
                  .card {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.15);
                    max-width: 420px;
                    width: 100%;
                    text-align: center;
                    position: relative;
                  }
                  .icon {
                    font-size: 48px;
                    background: #e6ffed;
                    color: #2f8f46;
                    width: 72px;
                    height: 72px;
                    line-height: 72px;
                    border-radius: 50%;
                    display: inline-block;
                    margin-bottom: 1rem;
                  }
                  h1 {
                    margin: 0.5rem 0;
                    font-size: 1.75rem;
                    color: #1f3d55;
                  }
                  p {
                    margin: 0.75rem 0 1.5rem;
                    color: #475569;
                  }
                  .btn {
                    display: inline-block;
                    padding: 0.60rem 1.5rem;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: 600;
                    background: #2563eb;
                    color: white;
                    margin: 25px 0 0 0;
                  }
                </style>
              </head>
              <body>
                <div class="card">
                  <div class="icon">✓</div>
                  <h1>Account Activated</h1>
                  <p>
                    Your profile has been activated successfully. You can now
                    <a class="btn" href="/login">Log In</a>
                  </p>
                </div>
              </body>
            </html>
            """;

    public static final String ACCOUNT_ACTIVATION_FAILURE = """
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="utf-8" />
                <title>Activation Failed</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <style>
                  body {
                    margin: 0;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
                    background: #f7f7fa;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                  }
                  .card {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.1);
                    max-width: 420px;
                    width: 100%;
                    text-align: center;
                    position: relative;
                  }
                  .icon {
                    font-size: 48px;
                    background: #ffe6e6;
                    color: #c92a2a;
                    width: 72px;
                    height: 72px;
                    line-height: 72px;
                    border-radius: 50%;
                    display: inline-block;
                    margin-bottom: 1rem;
                  }
                  h1 {
                    margin: 0.5rem 0;
                    font-size: 1.75rem;
                    color: #1f3d55;
                  }
                  p {
                    margin: 0.75rem 0 1.5rem;
                    color: #475569;
                  }
                </style>
              </head>
              <body>
                <div class="card">
                  <div class="icon">✕</div>
                  <h1>Activation Failed</h1>
                  <p>
                    The token is invalid, expired, or already used. <br />Please check your
                    email for the activation link.
                  </p>
                </div>
              </body>
            </html>
            """;
}
