import { ApolloClient, InMemoryCache } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";
import { persistCache } from "apollo3-cache-persist";
import { graphqlUrl } from '../app.json';

const createApolloClient = async () => {
    const cache = new InMemoryCache({
        typePolicies: {
            // see: https://www.apollographql.com/docs/react/caching/cache-field-behavior/#merging-non-normalized-objects
            Query: {
                fields: {
                    allTodos: {
                        merge(existing, incoming) {
                            return incoming;
                        }
                    }
                }
            }
        }
    });

    await persistCache({
        cache,
        storage: AsyncStorage
    });

    const apolloClient = new ApolloClient({
        uri: graphqlUrl,
        cache: cache
    });

    return apolloClient;
}

export default createApolloClient;

