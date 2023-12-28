import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import IPizza from '../../interfaces/IPizza';

const PizzaDetail: React.FC = () => {
    const { id } = useParams();
    const [pizza, setPizza] = useState<IPizza>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    `https://658032146ae0629a3f5495b5.mockapi.io/items/${id}`,
                );
                setPizza(data);
            } catch (error) {
                console.log('ERROR', error);
            }
        };

        fetchData();
    }, []);

    if (!pizza) {
        return 'Загрузка...';
    }

    return (
        <div className="content__detail">
            <img src={pizza.imageUrl} />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price}</h4>
        </div>
    );
};

export default PizzaDetail;
