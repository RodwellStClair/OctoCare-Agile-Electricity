import getTarriffConsump from '../localDB/getTarriffConsump'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { curTariff } from '../../Redux/CurtariffState';
import { curConsump } from '../../Redux/Curconsumption';

// this custom hook is used to fetch the data from the session storage and then dispatch it to the redux store;
//where additional data is fetched from server and state updated

function useData() {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState(null);
  const [loaded, setLoaded] = useState(false);
  let tariffLocal = null;
  let curconsumpLocal = null;

  const getCredendials = async () => {
    try {
      const cred = await JSON.parse(sessionStorage.getItem('cred'));
      return cred;
    } catch (error) {
      console.error('Error fetching credentials:', error);
      return null;
    }
  };

  useEffect(() => {
    getCredendials().then((cred) => {
      if (cred.demo) {
        setCredentials(cred)
      } else {
        setCredentials(cred);
      }
    });
    if (!loaded) setLoaded(true);
  }, [loaded]);

  useEffect(() => {
    const token = credentials?.token || null;
    const mpan = credentials?.mpan || null;
    const sn = credentials?.sn || null;
    const product_code = credentials?.userid || null;
    if (!token || !mpan || !sn || !product_code) return;
    dispatch(curTariff({ token: token, mpan: mpan, sn: sn, product_code: product_code }))
    dispatch(curConsump({ product_code: product_code }))
  }, [credentials]);


 if(credentials?.demo){
    tariffLocal = getTarriffConsump().tariffLocal;
    curconsumpLocal = getTarriffConsump().curconsumpLocal;
  }

console.log(tariffLocal, curconsumpLocal);
  const tariff = useSelector((state) => state.curTariff.data);
  const curconsump = useSelector((state) => state.curConsump.data);
  console.log(tariff, curconsump);
  return tariffLocal? {tariffLocal,curconsumpLocal} :{ tariff, curconsump };
}

export { useData };
