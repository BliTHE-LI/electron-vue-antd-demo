const getters = {
    device: state => state.app.device,
    token: state => state.user.token,
    userInfo: state => state.user.info
}

export default getters
