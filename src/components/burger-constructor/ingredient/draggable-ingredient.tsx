import styles from "../burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientModel} from "../../../utils/model.ts";
import {useCallback, useRef} from "react";
import {MOVE_INGREDIENT, REMOVE_INGREDIENT} from "../../../services/burger-constructor/actions.ts";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import type {Identifier, XYCoord} from 'dnd-core'

interface Props {
    item: IngredientModel,
    index: number
}

interface DragItem {
    index: number
    item: IngredientModel
}

export const DraggableIngredient = (props: Props) => {
    const {item, index} = props;
    const dispatch = useDispatch();

    const handleClose = useCallback((ingredient: IngredientModel) => {
        dispatch({type: REMOVE_INGREDIENT, payload: ingredient});
    }, [dispatch]);


    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        dispatch({type: MOVE_INGREDIENT, payload: {fromIndex: dragIndex, toIndex: hoverIndex}});
    }, [])

    const ref = useRef<HTMLLIElement>(null);
    const [{handlerId}, dropRef] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: "card",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex: number = item.index;
            const hoverIndex: number = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });

    const [{isDragging}, dragRef] = useDrag({
        type: 'card',
        item: () => {
            return {item, index}
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1
    dragRef(dropRef(ref));

    return (
        <li className={styles.li} style={{ opacity }} ref={ref} data-handler-id={handlerId}>
            <DragIcon className={styles.icon_drag} type="primary"/>
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => handleClose(item)}
            />
        </li>
    )
};