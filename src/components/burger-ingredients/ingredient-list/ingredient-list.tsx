import {Ingredient} from "../ingredient/ingredient";
import styles from "./ingredient-list.module.css";
import clsx from "clsx";
import {IngredientModel} from "../../../utils/model";
import {ForwardedRef, forwardRef, useMemo} from "react";
import {useSelector} from "react-redux";
import {getConstructorIngredients} from "../../../services/burger-constructor/selectors.ts";

interface Props {
    onClick?: () => void,
    title: string,
    items: IngredientModel[],
    onIngredientClick: (ingredient: IngredientModel) => void
}

export const IngredientList = forwardRef((props: Props, ref: ForwardedRef<HTMLParagraphElement>) => {

    const {bun, ingredients} = useSelector(getConstructorIngredients);
    const countMap = useMemo(() => {
        return props.items.reduce((map: Record<string, number>, ingredient) => {
            map[ingredient._id] = [bun, bun, ...ingredients].filter(item => item?._id === ingredient._id).length;
            return map;
        }, {});
    }, [props.items, bun, ingredients]);

    return (
        <>
            <p className={'text text_type_main-medium'} ref={ref}>{props.title}</p>
            <ul className={clsx('pl-4 pr-4', styles.list)}>
                {props.items.map(ingredient => (
                    <li key={ingredient._id}>
                        <Ingredient ingredient={ingredient}
                                    count={countMap[ingredient._id]}
                                    onClick={props.onIngredientClick}></Ingredient>
                    </li>
                ))}
            </ul>
        </>
    );
});