import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/navbar';
import styled from 'styled-components';
import immagine from '../img/dog.jpg';
import { useParams } from 'react-router-dom';
// import Newsletter from '../components/Newsletter/newsletter';
import Footer from '../components/Footer/footer';


const Container = styled.div`

`
const Wrapper = styled.div`
    padding-top: 2em;
    padding-bottom: 2em;
    padding-left: 1em;
    padding-right: 1em;
    display: flex;
    @media (max-width: 1024px) {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        font-size: smaller;
}
`
const ImgContainer = styled.div`
    width: 40%;
    @media (max-width: 1024px) {
        width: 100%;
}
`
const Image = styled.img`
    flex: 1;
    width: 100%;
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 30px;
`
const Category = styled.span`
    color: white;
    background-color: teal;
    border-radius: 30px;
    padding-left: 10px;
    padding-right: 10px;
`
const Title = styled.h2`
    font-weight: 200;
`
// const Brand = styled.span`
//     font-weight: 100;
//     color: grey;
//     font-size: 15px;
// `
const Desc = styled.p`
    margin: 20px 0px;
    font-size: 20px;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 20px;
`
const LocationContainer = styled.div`
    margin-top: 1em;
`
// const Amount = styled.input`
//     width: 60px;
//     height: 30px;
//     border-radius: 10px;
//     border: 1px solid teal;
//     justify-content: center;
// `
// const AmountContainer = styled.div`

// `
// const Button = styled.button`
//     margin-left: 2em;
//     border: 1px solid teal;
//     background-color: white;
//     color: teal;
//     cursor: pointer;
//     font-weight: 900;
//     border-radius: 10px;
//     padding-left: 15px;
//     padding-right: 15px;
//     text-align: center;
//     &:hover{
//         background-color: teal;
//         color: white;
//         font-weight: 900;
//         transition: all 0.4s ease;
//     }
// `

function SingleService() {

    const data = useParams();
    const id = data.id;
    // const {items} = useFetch(`https://site212224.tw.cs.unibo.it/Service/id/${id.substring(1)}`);

    const [datas, setDatas] = useState([]);
    const [locations, setLocations] = useState([]);
    // setLocations(items.location)
    // console.log(locations)

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    const fetchData = async () => {
        const items = await fetch(`https://site212224.tw.cs.unibo.it/Service/id/${id.substring(1)}`);
        const fetched = await items.json();

        setDatas(fetched)
        setLocations(fetched.location);
    }

    return (
        <Container>
            <Navbar />
            <Wrapper className='container'>
                <ImgContainer>
                    <Image src={immagine} />
                </ImgContainer>
                <InfoContainer>
                    <Category> {datas.category} </Category>
                    <Title style={{ marginTop: '1em', marginBottom: '0px' }}> {datas.name} </Title>
                    <Desc> Description: {datas.description} </Desc>
                    <Price> Price: €{datas.price} </Price>

                    <LocationContainer>
                        <select className="form-select" aria-label="Default select example">
                            {locations.map(loc => (
                                <option value={loc} key={loc}>{loc}</option>
                            ))};
                        </select>
                    </LocationContainer>
                </InfoContainer>
                <hr/>
            </Wrapper>
            <Footer />

        </Container >

    );
}

export default SingleService;