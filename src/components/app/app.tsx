import {AppHeader} from "../app-header/app-header";
import styles from './app.module.css';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {HomePage} from "../../pages/home/home.tsx";
import {IngredientDetails} from "../ingredient-details/ingredient-details.tsx";
import {LoginPage} from "../../pages/login/login.tsx";
import {RegisterPage} from "../../pages/register/register.tsx";
import {ForgotPasswordPage} from "../../pages/forgot-password/forgot-password.tsx";
import {ProfilePage} from "../../pages/profile/profile.tsx";
import {NotFound404} from "../../pages/not-found/not-found.tsx";
import {Modal} from "../modal/modal.tsx";
import {ResetPasswordPage} from "../../pages/reset-password/reset-password.tsx";
import {OrdersPage} from "../../pages/profile/orders/orders.tsx";
import {UserProfilePage} from "../../pages/profile/user/user.tsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {loadAllIngredients} from "../../services/ingredients/actions.ts";


function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const background = location.state && location.state.background;

    useEffect(() => {
        dispatch(loadAllIngredients());
    }, []);

    const handleModalClose = () => {
        // Возвращаемся к предыдущему пути при закрытии модалки
        navigate(-1);
    };

    return (
        <>
            <AppHeader/>
            <main className={styles.main}>
                <Routes location={background || location}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                    <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}>
                        <Route path="" element={<UserProfilePage/>}/>
                        <Route path="orders" element={<OrdersPage/>}/>
                    </Route>
                    <Route path="/ingredients/:ingredientId" element={<IngredientDetails/>}/>
                    <Route path="*" element={<NotFound404/>}/>
                </Routes>

                {background && (
                    <Routes>
                        <Route
                            path='/ingredients/:ingredientId'
                            element={
                                <Modal onClose={handleModalClose}>
                                    <IngredientDetails/>
                                </Modal>
                            }
                        />
                    </Routes>
                )}
            </main>
        </>
    );
}

export default App;
