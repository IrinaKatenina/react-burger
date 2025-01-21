import type {} from 'cypress';
import ingredients from '../fixtures/ingredients.json'

describe('Application', () => {
    beforeEach(function() {
        window.localStorage.setItem("refreshToken", JSON.stringify("test-refreshToken"));
        window.localStorage.setItem("accessToken", "test-accessToken");
        cy.intercept("GET", "api/ingredients", {fixture: "ingredients.json"});
        cy.intercept("GET", "api/auth/user", {fixture: "me.json"});

        cy.visit('/');
        cy.contains("Соберите бургер");
        cy.get('[data-testid=bun]').first().as('bun');
        cy.get('[data-testid=ingredient]').first().as('ingredient');
    });

    const bunDropTargetSelector = '[data-testid=burger_constructor_drop_bun]';
    const ingredientsDropTargetSelector = '[data-testid=burger_constructor_drop_ingredients]';

    const moveElement = (elementSelector:string, targetSelector: string) => {
        cy.wait(500);
        cy.get(elementSelector).trigger('dragstart');
        cy.get(targetSelector).first().trigger('drop');
        cy.wait(500);
        cy.get(targetSelector).trigger('dragend');
        cy.wait(500);
    }

    it('перетаскивание булки в конструктор', () => {
        const bun = ingredients.data.find(ingredient => ingredient.type === "bun");

        cy.get('@bun').find('[data-testid=ingredient_name]').should('exist').should('have.text', bun!.name);

        // Перетаскиваем булку
        moveElement('@bun', bunDropTargetSelector);

        // Проверяем, что элемент успешно перемещен
        cy.get(bunDropTargetSelector).find('[class^="constructor-element__text"]')
            .should('contain', bun!.name);
    })


    it('перетаскивание ингредиента в конструктор', () => {
        const ingredient = ingredients.data.find(ingredient => ingredient.type === "sauce");

        cy.get('@ingredient').find('[data-testid=ingredient_name]').should('exist').should('have.text', ingredient!.name);

        // Перетаскиваем ингредиент
        moveElement('@ingredient', ingredientsDropTargetSelector);

        // Проверяем, что элемент успешно перемещен
        cy.get(ingredientsDropTargetSelector).find('[data-testid=constructor_element] [class^="constructor-element__text"]')
            .should('contain', ingredient!.name);
        cy.get(ingredientsDropTargetSelector).find('[data-testid=constructor_element]').should('have.length', 1);

        // Перетаскиваем ингредиент
        moveElement('@ingredient', ingredientsDropTargetSelector);

        // Проверяем, что элемент успешно перемещен
        cy.get(ingredientsDropTargetSelector).find('[data-testid=constructor_element]').should('have.length', 2);
    })

    it('открытие модального окна с описанием ингредиента и закрытие', () => {
        // Перетаскиваем булку
        moveElement('@bun', bunDropTargetSelector);
        // Перетаскиваем ингредиент
        moveElement('@ingredient', ingredientsDropTargetSelector);


        cy.get('[data-testid=burger_constructor] button').contains('Оформить заказ').click();

        // закрытие модальных окон при клике на кнопку закрытия
        cy.get('[data-testid=modal_header] > svg').first().click();
        cy.get('[data-testid=modal]').should('not.exist');
    })
})