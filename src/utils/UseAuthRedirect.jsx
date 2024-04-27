import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '@/utils/Store';

export function UseAuthRedirect() {
    const navigate = useNavigate();
    const { state } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        if (userInfo == null) {
            navigate("/signin");
        }
    }, [userInfo, navigate]);
}
