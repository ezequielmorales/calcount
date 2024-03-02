import logo from '../images/logo.png'

const Logo = () => {
    return (
        <figure className="m-0 text-center" id="logo">
            <img src={logo} alt="Logo de Calcount de color blanco" className="img-fluid" />
        </figure>
    )
}

export default Logo