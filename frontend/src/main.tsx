import { ApolloProvider } from '@apollo/client'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import client from './graphql/apollo.ts'

createRoot(document.getElementById('root')!).render(
	<ApolloProvider client={client}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ApolloProvider>
)
