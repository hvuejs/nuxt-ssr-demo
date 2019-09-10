import Cookie from 'js-cookie';
export default function ({ redirect }) {
    var token = Cookie.get('_userlogin');
    if (!token) {
        redirect('/login');
    }
}