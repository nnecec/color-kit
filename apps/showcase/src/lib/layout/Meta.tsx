const APP_NAME = 'vite-react-tailwind-starter'

const Meta = () => {
  return (
    <>
      <title>Vite React Tailwind Starter</title>
      <meta content="Vite React Tailwind Starter Template" name="description" />

      <meta content={APP_NAME} name="application-name" />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta content="default" name="apple-mobile-web-app-status-bar-style" />
      <meta content={APP_NAME} name="apple-mobile-web-app-title" />
      <meta content="telephone=no" name="format-detection" />
      <meta content="yes" name="mobile-web-app-capable" />
      <meta content="#FFFFFF" name="theme-color" />

      <link href="/assets/favicon.svg" rel="shortcut icon" />
    </>
  )
}

export default Meta
