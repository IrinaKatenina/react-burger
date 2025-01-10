import {Ingredient} from "../ingredient/ingredient";
import styles from "./ingredient-list.module.css";
import clsx from "clsx";
import {IngredientModel} from "../../../utils/model";
import {forwardRef, useMemo} from "react";
import {getConstructorIngredients} from "../../../services/burger-constructor/selectors.ts";
import {useSelector} from "../../../services/store.ts";

interface Props {
    onClick?: () => void,
    title: string,
    items: IngredientModel[],
}

export const IngredientList = forwardRef<HTMLParagraphElement, Props>(
    ({items, title}, ref) => {

        const {bun, ingredients} = useSelector(getConstructorIngredients);
        const countMap = useMemo(() => {
            return items.reduce((map: Record<string, number>, ingredient) => {
                map[ingredient._id] = [bun, bun, ...ingredients].filter(item => item?._id === ingredient._id).length;
                return map;
            }, {});
        }, [items, bun, ingredients]);

        return (
            <>
                <p className={'text text_type_main-medium'} ref={ref}>{title}</p>
                <ul className={clsx('pl-4 pr-4', styles.list)}>
                    {items.map(ingredient => (
                        <li key={ingredient._id}>
                            <Ingredient ingredient={ingredient}
                                        count={countMap[ingredient._id]}
                            ></Ingredient>
                        </li>
                    ))}
                </ul>
            </>
        );
    });