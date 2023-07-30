import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const countriesUrl = "https://ih-countries-api.herokuapp.com/countries"

function CountryDetails() {
    const [country, setCountry] = useState([])
    const [loading, setLoading] = useState(true)
    const params = useParams()

    useEffect(() => {
        axios.get(countriesUrl).then((response) => {
            setCountry(response.data.filter(elem => elem.alpha3Code === params.countryId))
            setLoading(false)
        })
    }, [params])

    return (
        <div className="container">
            <p style={{fontSize: "24px", fontWeight: "bold"}}>Country Details</p>
            {loading && <p>Loading</p>}
            {
                country.map((elem) => {
                    return (
                        <>
                            <h1>{elem.name.official}</h1>
                            <table className="table">
                                <thead></thead>
                                <tbody>
                                    <tr>
                                        <td style={{width: "30%"}}>Capital</td>
                                        <td>{elem.capital[0]}</td>
                                    </tr>
                                    <tr>
                                        <td>Area</td>
                                        <td>
                                            {elem.area} km
                                            <sup>2</sup>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Borders</td>
                                        <td>
                                            <ul>
                                                {elem.borders.map((element) => {
                                                    return (
                                                        <Link to={`../${element}`}>{element}</Link>
                                                    )
                                                })}
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    )
                })
            }
        </div>
    )
}

export default CountryDetails;
