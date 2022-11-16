import { Helmet } from 'react-helmet-async';
import NavbarAdmin from '../../components/NavbarAdmin';
import icon1 from '../../assets/user.png';
import icon2 from '../../assets/class.png';
import icon3 from '../../assets/rooms.png';
import icon4 from '../../assets/building.png';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms/userAtom';
import { useEffect } from 'react';
import { useState } from 'react';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { firestoreDb } from '../../../firebase';

const Dashboard = () => {
  const user = useRecoilValue(userState);
  const [loading, setLoading] = useState(false);
  const [userLength, setUserLength] = useState(null);
  const [classLength, setClassLength] = useState(null);

  useEffect(() => {
    getUserLength();
    getClassLength();
  }, []);

  const getUserLength = async () => {
    const q = query(collection(firestoreDb, 'users'));
    const docSnap = await getDocs(q);
    setUserLength(docSnap.docs.length ? docSnap.docs.length : 0);
  };

  const getClassLength = async () => {
    const q = query(collection(firestoreDb, 'classgrade'));
    const docSnap = await getDocs(q);
    const data = docSnap.docs
      .map((doc) => {
        return doc.data().classname.length;
      })
      .reduce((total, val) => {
        return total + val;
      });

    setClassLength(data ? data : 0);
  };

  const cardItem = [
    {
      image: icon1,
      title: 'Total User:',
      total: userLength,
    },
    {
      image: icon2,
      title: 'Total Class:',
      total: classLength,
    },
    {
      image: icon3,
      title: 'Total Rooms:',
      total: 100,
    },
    {
      image: icon4,
      title: 'Total Building:',
      total: 100,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Home | Schedus</title>
      </Helmet>

      <NavbarAdmin user={user} />

      <div className="layoutContainer">
        <h1 className="pageName">Home</h1>

        <div className="flex flex-col md:grid md:grid-cols-4 gap-3">
          {cardItem.map((item, i) => (
            <div key={i} className="hover:scale-105 hover:bg-blue-100 transition-all duration-300 bg-white my-3 rounded-md p-6 shadow">
              <div className="flex flex-row justify-start gap-4">
                <img src={item.image} alt="card image" className="h-14" />
                <div className="flex flex-col">
                  <p className="text-md text-gray-400 font-medium">{item.title}</p>
                  <h3 className="text-4xl font-semibold pt-1">{`${item.total ? item.total : '...'}`}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
