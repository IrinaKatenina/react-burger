import type {} from 'cypress';
import ingredients from '../fixtures/ingredients.json'

describe('Application', () => {
    beforeEach(function () {
        cy.intercept("GET", "api/ingredients", {fixture: "ingredients.json"});

        cy.visit('/');
        cy.contains("Соберите бургер");

        cy.get('[data-testid=ingredient]').first().as('ingredient');
        cy.get('@ingredient').click();
        cy.get('[data-testid=modal]').should('exist');
    });

    it('открытие модального окна с описанием ингредиента', () => {
        const firstIngredient = ingredients.data.find(ingredient => ingredient.type === "sauce");

        cy.get('@ingredient').find('[data-testid=ingredient_name]').should('exist').should('have.text', firstIngredient!.name);

        // отображение в модальном окне данных ингредиента
        cy.get('[data-testid=modal_body]').should('exist').should('not.be.empty');
        cy.get('[data-testid=ingredient_details_name]').should('exist').should('have.text', firstIngredient!.name);
    })

    it('закрытие модальных окон при клике на кнопку закрыти', () => {
        cy.get('[data-testid=modal_header] > svg').first().click();
        cy.get('[data-testid=modal]').should('not.exist');
    })

})