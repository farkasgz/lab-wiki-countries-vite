import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const countriesUrl = "https://ih-countries-api.herokuapp.com/countries"

function HomePage() {
    const [countries, setCountries] = useState([])
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        axios.get(countriesUrl).then((response) => {
            setCountries(response.data)
            setFetching(false)
        })
    }, [])
    
    return (
        <div className="container" style={{maxHeight: "90vh", overflow: "scroll"}}>
            <h1 style={{fontSize: "24px"}}>WikiCountries: Your Guide to the World</h1>
            <div className="list-group">
                {fetching && <p>Loading</p>}
                {
                    countries.map((country) => {
                        return (
                            <Link className="list-group-item list-group-item-action" to={country.alpha3Code}><img src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`} alt={country.name.common} />{country.name.common}</Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default HomePage;
