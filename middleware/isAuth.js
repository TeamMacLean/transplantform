export default function ({app, error}) {

    if (!app.context.store.getters['isAuthenticated']) {
        error({errorCode: 403, message: 'You are not allowed to see this'})
    }
}