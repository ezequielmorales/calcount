import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const UsersByCountryMap = () => {
    let userId = localStorage.getItem("userId");
    let apiKey = localStorage.getItem("apiKey");

    const [countries, setCountries] = useState([]);
    const [countriesWithUsers, setCountriesWithUsers] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //Load countries
                let requestOptionsCountries = {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                };

                const responseCountries = await fetch("https://calcount.develotion.com/paises.php", requestOptionsCountries);
                const resultCountries = await responseCountries.json();
                setCountries(resultCountries.paises);

                //Load users by country
                let requestOptionsCountriesWithUsers = {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "apikey": apiKey,
                        "iduser": userId
                    }
                };

                const responseCountriesWithUsers = await fetch("https://calcount.develotion.com/usuariosPorPais.php", requestOptionsCountriesWithUsers);
                const resultCountriesWithUsers = await responseCountriesWithUsers.json();
                setCountriesWithUsers(resultCountriesWithUsers.paises);

                //Create final array
                const countriesAux = [];
                resultCountries.paises.forEach(country => {
                    const countryWithUsers = resultCountriesWithUsers.paises.find(c => c.id === country.id)
                    countriesAux.push({
                        id: country.id,
                        countryName: country.name,
                        lat: country.latitude,
                        long: country.longitude,
                        usersCount: countryWithUsers ? countryWithUsers.cantidadDeUsuarios : 0
                    });
                });

                setLocations(countriesAux);
            } catch (error) {
                toast.error('Error en la solicitud');
            }
        };

        fetchData();
    }, []);

    return (
        <div className="col-12 col-sm-7 col-xl-3 p-1 order-sm-5" id="usersByCountryMap">
            <section className="rounded p-3 d-flex justify-content-center align-items-center">
                <MapContainer center={[-15, -62]} zoom={2} scrollWheelZoom={true} style={{ width: "100%", height: "100%" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {locations.map((objLocation) => (
                        <Marker key={objLocation.id} position={[objLocation.lat, objLocation.long]}>
                            <Popup>
                                Hay {objLocation.usersCount} Calcounters en {objLocation.countryName}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </section>
        </div>
    );
}

export default UsersByCountryMap;
