import './IngredientDetail.css';
import axios from "axios";
import React, { Component, useState, Input, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect,
    useHistory
} from "react-router-dom";
import serverURL from "../../../serverURL";
import Loading from "../../Loading/Loading";

const IngredientDetail = () => {
    let { id } = useParams();
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categorysIngredient, setCategorysIngredient] = useState([]);
    const [modify, setModify] = useState(false);
    const [quantite, setNewQuantite] = useState(0);
    const [prix, setNewPrix] = useState(0);
    const [allergene, setAllergene] = useState('');
    const [unites, setUnites] = useState([]);
    const [unite, setUnite] = useState('');
    const [categoryIngredient, setCategoryIngredient] = useState('');
    const [categorysAllergen, setCategorysAllergen] = useState([]);
    const [categoryAllergen, setCategoryAllergen] = useState('');
    const history = useHistory();

    useEffect(() => {
        
        async function fetchData (){
        axios(`${serverURL}/api/ingredients/${id}`)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
                axios(`${serverURL}/api/ingredientCat/${response.data[0].idCategorieIngredient}`)
                    .then((response) => {
                        setData1(response.data);
                        axios(`${serverURL}/api/ingredientCat`)
                            .then((response) => {
                                setCategorysIngredient(response.data);
                                console.log(response.data);
                                axios(`${serverURL}/api/unite`)
                                    .then((response) => {
                                        setUnites(response.data);
                                        console.log(response.data);
                                        axios(`${serverURL}/api/categoryAllergen`)
                                            .then((response) => {
                                                setCategorysAllergen(response.data);
                                                console.log(response.data);
                                                setLoading(false);
                                            })
                                            .catch((error) => {
                                                console.error("Error fetching data: ", error);
                                                setError(error);
                                            })
                                            .finally(() => {
                                            });
                                    })
                                    .catch((error) => {
                                        console.error("Error fetching data: ", error);
                                        setError(error);
                                    })
                                    .finally(() => {
                                    });
                            })
                            .catch((error) => {
                                console.error("Error fetching data: ", error);
                                setError(error);
                            })
                            .finally(() => {
                            });
                    }).catch((error) => {
                        console.error("Error fetching data: ", error);
                        setError(error);
                    })
                    .finally(() => {
                    });
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => {
            });
        }
        fetchData();
    }, []);

    const modification = () => {
        setModify(true);
    }

    const terminer = () => {
        setModify(false);
    }

    const modifyQuantite = () => {
        setLoading(true);
        axios.put(`${serverURL}/api/ingredients/updateQuantite`, {
            id: id,
            quantite: quantite
        }).then((response) => {
        })
            .catch((error) => {
                console.error("Error updating data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
                window.location.reload(false);
            });
    }

    const modifyPrix = () => {
        setLoading(true);
        axios.put(`${serverURL}/api/ingredients/updatePrix`, {
            id: id,
            prix: prix
        }).then((response) => {
        })
            .catch((error) => {
                console.error("Error updating data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
                window.location.reload(false);
            });
    }

    const modifyAllergene = () => {
        setLoading(true);
        console.log(allergene);
        if (allergene == "Oui") {
            axios.put(`${serverURL}/api/ingredients/updateAllergene`, {
                id: id,
                allergene: allergene
            }).then((response) => {
            })
                .catch((error) => {
                    console.error("Error updating data: ", error);
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                    window.location.reload(false);
                });
        } else {
            axios.put(`${serverURL}/api/ingredients/updateAllergene`, {
                id: id,
                allergene: allergene
            }).then((response) => {
            })
                .catch((error) => {
                    console.error("Error updating data: ", error);
                    setError(error);
                })
                .finally(() => {
                });
            axios.put(`${serverURL}/api/ingredients/setCategoryAllergen`, {
                id: id
            }).then((response) => {
            })
                .catch((error) => {
                    console.error("Error updating data: ", error);
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                    window.location.reload(false);
                });
        }
    }

    const modifyUnite = () => {
        setLoading(true);
        axios.put(`${serverURL}/api/ingredients/updateUnite`, {
            id: id,
            unite: unite
        }).then((response) => {
        })
            .catch((error) => {
                console.error("Error updating data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
                window.location.reload(false);
            });
    }

    const modifyCategoryIngredient = () => {
        setLoading(true);
        axios.put(`${serverURL}/api/ingredients/updateCategoryIngredient`, {
            id: id,
            categoryIngredient: categoryIngredient
        }).then((response) => {
        })
            .catch((error) => {
                console.error("Error updating data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
                window.location.reload(false);
            });
    }

    const modifyCategoryAllergen = () => {
        setLoading(true);
        axios.put(`${serverURL}/api/ingredients/updateCategoryAllergen`, {
            id: id,
            categoryAllergen: categoryAllergen
        }).then((response) => {
        })
            .catch((error) => {
                console.error("Error updating data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
                window.location.reload(false);
            });
    }

    const deleteIngredient = () => {
        setLoading(true);
        axios.delete(`${serverURL}/api/ingredients/delete/${id}`)
            .then((response) => {
            })
            .catch((error) => {
                console.error("Error deleting data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
                const url = "/mercurial/" + data[0].idCategorieIngredient + "/ingredients";
                history.push(url);
            });
    }

    return (
        <>
            {!loading && data[0] != null && data1[0] != null?
                <>
                    <Link to={"/mercurial/" + data[0].idCategorieIngredient + "/ingredients"}>
                        <Button className="backmercurial m-3" variant="contained" size="lg">
                            <div>{`<< ${data1[0].libelleCategorie.toUpperCase()}`}</div>
                        </Button>
                    </Link>
                    <div className="text-center mt-5">
                        <h1>{data[0].libelle}</h1>
                    </div>
                    <div className="darkcontainer mt-4 d-flex" >
                        <div className="divDroite">
                            <h4><b>Quantit?? actuelle stock??e :</b> {data[0].quantiteStockee} {data[0].unite}</h4>
                            <h4><b>Unit?? :</b> {data[0].unite}</h4>
                            <h4><b>Prix Unitaire :</b> {data[0].prixUnitaire} ???</h4>
                            <h4><b>Cat??gorie d'ingr??dients :</b> {data[0].libelleCategorie}</h4>
                            <h4><b>Allerg??ne :</b> {data[0].allergene}</h4>
                            {data[0].idCategorieAllergene != null ?
                                <h4><b>Cat??gorie d'allerg??ne :</b> {data[0].idCategorieAllergene}</h4> : null}
                        </div>
                        {modify ?
                            <div className="divGauche">
                                <div className="d-flex">
                                    <input
                                        id="Quantite"
                                        name="Quantite"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        onChange={(event) => {
                                            setNewQuantite(event.target.value);
                                        }}
                                        className="input1"
                                        placeholder="Quantit?? ..."
                                    />
                                    {quantite ? <button className="modifierValue btn-lg btn-info" onClick={modifyQuantite}>modifier</button> :
                                        <button className="modifierValue btn-lg btn-light" disabled>modifier</button>}
                                </div>
                                <div className="d-flex">
                                    <select
                                        name="Unites"
                                        id="Unites"
                                        className="input1"
                                        onChange={(event) => {
                                            setUnite(event.target.value);
                                        }}>
                                        <option value="">Unit??...</option>
                                        {
                                            unites.map(element => {
                                                return <option value={element.symbole}>
                                                    {element.symbole}</option>;
                                            })
                                        }

                                    </select>
                                    {unite ? <button className="modifierValue btn-lg btn-info" onClick={modifyUnite}>modifier</button> :
                                        <button className="modifierValue btn-lg btn-light" disabled>modifier</button>}
                                </div>
                                <div className="d-flex">
                                    <input
                                        id="Prix"
                                        name="Prix"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        onChange={(event) => {
                                            setNewPrix(event.target.value);
                                        }}
                                        className="input1"
                                        placeholder="Prix Unitaire ..."
                                    />
                                    {prix ? <button className="modifierValue btn-lg btn-info" onClick={modifyPrix}>modifier</button> :
                                        <button className="modifierValue btn-lg btn-light" disabled>modifier</button>}
                                </div>
                                <div className="d-flex">
                                    <select
                                        name="CategoryIngredient"
                                        id="CategoryIngredient"
                                        className="input1"
                                        onChange={(event) => {
                                            setCategoryIngredient(event.target.value);
                                        }}>
                                        <option value="">Cat??gorie d'ingr??dient ...</option>
                                        {
                                            categorysIngredient.map(element => {
                                                return <option value={element.idCategorieIngredient}>
                                                    {element.libelleCategorie}</option>;
                                            })
                                        }
                                    </select>
                                    {categoryIngredient ? <button className="modifierValue btn-lg btn-info" onClick={modifyCategoryIngredient}>modifier</button> :
                                        <button className="modifierValue btn-lg btn-light" disabled>modifier</button>}
                                </div>
                                <div className="d-flex">
                                    <select
                                        name="Allergene"
                                        id="Allergene"
                                        className="input1"
                                        onChange={(event) => {
                                            setAllergene(event.target.value);
                                        }}
                                        placeholder='Allerg??ne ...'>
                                        <option value="">Allerg??ne ?</option>
                                        <option value="Non">Non</option>
                                        <option value="Oui">Oui</option>
                                    </select>
                                    {allergene ? <button className="modifierValue btn-lg btn-info" onClick={modifyAllergene}>modifier</button> :
                                        <button className="modifierValue btn-lg btn-light" disabled>modifier</button>}
                                </div>
                                {data[0].allergene == "Oui" ?
                                    <div className="d-flex">
                                        <select
                                            name="CategoryAllergene"
                                            id="CategoryAllergene"
                                            className="input1"
                                            onChange={(event) => {
                                                setCategoryAllergen(event.target.value);
                                            }}
                                            placeholder='Allerg??ne ...'>
                                            <option value="">Cat??gorie Allerg??ne ...</option>
                                            {
                                                categorysAllergen.map(element => {
                                                    return <option value={element.libelleCategorieAllergene}>
                                                        {element.libelleCategorieAllergene}</option>;
                                                })
                                            }
                                        </select>
                                        {categoryAllergen ? <button className="modifierValue btn-lg btn-info" onClick={modifyCategoryAllergen}>modifier</button> :
                                            <button className="modifierValue btn-lg btn-light" disabled>modifier</button>}
                                    </div>
                                    : null}
                            </div>
                            : null}
                    </div>
                    {!modify ?
                        <>
                            <div className="mt-4 text-center">
                                <button className="modifyIngredient btn-lg m-2" onClick={modification}>Modifier</button>
                                <button className="deleteIngredient btn-lg m-2" onClick={deleteIngredient}>Supprimer</button>
                            </div>
                        </> :
                        <>
                            <div className="mt-4 text-center">
                                <button className="modifyIngredient btn-lg m-2" disabled>Modifier</button>
                                <button className="deleteIngredient btn-lg m-2" disabled>Supprimer</button>
                            </div>
                            <div className=" text-center">
                                <button className="terminer btn-lg m-2" onClick={terminer}>Annuler</button>
                            </div>
                        </>
                    }
                </> :
                <Loading />}
        </>
    );
}

export default IngredientDetail;
