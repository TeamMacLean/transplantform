// import isAdminGql from '../gql/users/isAdmin.gql'

export default function ({app, error}) {
    // const hasToken = !!app.$apolloHelpers.getToken();
    const client = app.apolloProvider.defaultClient;

    // if (!app.context.store.getters['isAuthenticated']) {
    //     error({errorCode: 403, message: 'You are not allowed to see this'})
    // } else {
    //
    //     try {
    //         return client.query({
    //             query: isAdminGql
    //         }).then(({data}) => {
    //             if (!(data && data.isAdmin)) {
    //                 error({errorCode: 403, message: 'You are not allowed to see this'})
    //             }
    //         });
    //     } catch (e) {
    //         console.error(e);
    //         error({errorCode: 900, message: 'GraphQL error occurred'});
    //     }
    // }
}
