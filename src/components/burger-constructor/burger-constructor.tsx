import styles from './burger-constructor.module.css';
import clsx from "clsx";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback, useMemo, useState} from "react";
import {Modal} from "../modal/modal.tsx";
import {OrderDetails} from "../order-details/order-details.tsx";
import {useDispatch, useSelector} from "react-redux";
import {clearOrder, makeOrder} from "../../services/order/actions.ts";
import {getConstructorIngredients} from "../../services/burger-constructor/selectors.ts";
import {useDrop} from "react-dnd";
import {IngredientModel} from "../../utils/model.ts";
import {ADD_INGREDIENT, REMOVE_INGREDIENT, UPDATE_BUN} from "../../services/burger-constructor/actions.ts";

export const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const {bun, ingredients} = useSelector(getConstructorIngredients);

    const totalPrice = useMemo(() => {
        const itemsPrice = ingredients.reduce((acc, item) => acc + (item?.price ?? 0), 0);
        return (bun?.price ?? 0) * 2 + itemsPrice;
    }, [bun, ingredients]);

    const [isPopupVisible, setPopupVisible] = useState(false);

    const onMakeOrder = () => {
        const items = [bun?._id, ingredients.map(item => item?._id), bun?._id];
        dispatch(makeOrder({ingredients: items}));

        setPopupVisible(true);
    };

    const onCloseModal = () => {
        dispatch(clearOrder());
        setPopupVisible(false);
    };

    const bunHandleDrop = (ingredient: IngredientModel) => {
        dispatch({type: UPDATE_BUN, payload: ingredient});
    };

    const ingredientHandleDrop = (ingredient: IngredientModel) => {
        dispatch({type: ADD_INGREDIENT, payload: ingredient});
    };

    const [{topBunCanDrop}, bunTopDropRef] = useDrop(() => ({
        accept: "bun",
        drop: (ingredient: IngredientModel) => {
            bunHandleDrop(ingredient);
        },
        collect: (monitor) => ({
            topBunCanDrop: monitor.canDrop(),
        }),
    }));

    const [{bottomBunCanDrop}, bunBottomDropRef] = useDrop(() => ({
        accept: "bun",
        drop: (ingredient: IngredientModel) => {
            bunHandleDrop(ingredient);
        },
        collect: (monitor) => ({
            bottomBunCanDrop: monitor.canDrop(),
        }),
    }));

    const [{canDrop}, mainDropRef] = useDrop(() => ({
        accept: "ingredient",
        drop: (ingredient: IngredientModel) => (ingredientHandleDrop(ingredient)),
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
        }),
    }))

    const handleClose = useCallback((ingredient:IngredientModel) => {
        dispatch({type:REMOVE_INGREDIENT, payload: ingredient});
    },[dispatch]);

    return ((
            <section className={clsx('pt-25 pl-4 pr-4', styles.container)}>
                <ul className={styles.list}>

                    <li key={bun?._id} className={clsx('pl-8', styles.li)} ref={bunTopDropRef}>
                        {bun ?
                            <ConstructorElement
                                extraClass={clsx((topBunCanDrop || bottomBunCanDrop) && '_active')}
                                type={'top'}
                                text={bun.name + " (верх)"}
                                price={bun.price}
                                thumbnail={bun.image}
                                isLocked={true}
                            /> :
                            <ConstructorElement
                                extraClass={clsx('_empty', (topBunCanDrop || bottomBunCanDrop) && '_active')}
                                type={'top'}
                                text={'Выберите булку'}
                                price={0}
                                thumbnail={''}
                                isLocked={true}
                            />}
                    </li>

                    <div
                        className={clsx(styles.scroll, 'custom-scroll', ingredients?.length && canDrop && styles.scroll_active)}
                        ref={mainDropRef}>
                        {ingredients?.length ?
                            ingredients.map(item => (
                                <li key={item._id} className={styles.li}>
                                    <DragIcon className={styles.icon_drag} type="primary"/>
                                    <ConstructorElement
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                        handleClose={()=>handleClose(item)}
                                    />
                                </li>
                            )) :
                            <li key={"center"} className={clsx('pl-8', styles.li)}>
                                <ConstructorElement
                                    extraClass={clsx('_empty', canDrop && '_active')}
                                    text={'Выберите начинку'}
                                    price={0}
                                    thumbnail={''}
                                />
                            </li>
                        }
                    </div>
                    <li key={bun?._id + "_bottom"} className={clsx('pl-8', styles.li)} ref={bunBottomDropRef}>
                        {bun ?
                            <ConstructorElement
                                extraClass={clsx((topBunCanDrop || bottomBunCanDrop) && '_active')}
                                type={'bottom'}
                                text={bun.name + " (низ)"}
                                price={bun.price}
                                thumbnail={bun.image}
                                isLocked={true}
                            /> :
                            <ConstructorElement
                                extraClass={clsx('_empty', (topBunCanDrop || bottomBunCanDrop) && '_active')}
                                type={'bottom'}
                                text={'Выберите булку'}
                                price={0}
                                thumbnail={''}
                                isLocked={true}
                            />}
                    </li>
                </ul>

                <div className={clsx('pt-10 pb-10', styles.toolbar)}>
                    <div className={clsx('text text_type_digits-medium', styles.price)}>
                        {totalPrice}
                        <CurrencyIcon type="primary"/>
                    </div>

                    <Button htmlType="button"
                            type="primary"
                            size="large"
                            onClick={onMakeOrder}
                            disabled={!bun || !ingredients?.length}
                    >
                        Оформить заказ
                    </Button>
                </div>

                {isPopupVisible && (
                    <Modal onClose={onCloseModal}>
                        <OrderDetails/>
                    </Modal>
                )}
            </section>
        )
    );
}