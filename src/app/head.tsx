export const metadata = {
    title: 'ManoMed AI',
    description: 'AI-powered medical expert system',
    icons: {
      icon: '/icon.ico?v=2',
    },
  };
  
  export default function Head() {
    return (
      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icons.icon} />
      </>
    );
  }
  