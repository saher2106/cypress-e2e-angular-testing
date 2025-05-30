describe('Todos', () => {
  beforeEach(()=>{
    cy.intercept({
      method: 'GET',
      url: 'http://localhost:3004/todos'
    },{
      body:[
        {
          "text": "Complete Angular project",
          "isCompleted": false,
          "id": 1
        },
        {
          "text": "Learn React fundamentals",
          "isCompleted": true,
          "id": 2
        },
        {
          "text": "Prepare for job interview",
          "isCompleted": false,
          "id": 3
        },
        {
          "text": "Buy groceries",
          "isCompleted": false,
          "id": 4
        },
        {
          "text": "Call mom",
          "isCompleted": true,
          "id": 5
        },
        {
          "text": "Go to the gym",
          "isCompleted": false,
          "id": 6
        },
        {
          "text": "Read new book",
          "isCompleted": false,
          "id": 7
        },
        {
          "text": "Plan weekend trip",
          "isCompleted": true,
          "id": 8
        }
      ]
    }).intercept({
      method:'POST',
      url:'http://localhost:3004/todos'
    },{
      body:{text:'foo', id:4, isCompleted:false},
    })
    .intercept({
      method:'DELETE',
      url:'http://localhost:3004/todos/1'
    },{
      body:{},
    })
    .intercept({
      method:'PATCH',
      url:'http://localhost:3004/todos/1'
    },{
      body:{text: 'foo', id:1, isCompleted: true},
    })
    .visit('/');
  });
  it('Visits the initial project page', () => {
    cy.contains('todos');
  });
  it("renders 8 todos", ()=>{
    cy.get('[data-cy="todo"]').should('have.length', 8);
    cy.get('[data-cy="todoLabel"]').eq(5).should('contain.text', 'Go to the gym');
    cy.get('[data-cy="todoCheckbox"]').eq(4).should('be.checked', 'Call mom');
  });
  it("renders footer",()=>{
    cy.get('[data-cy="todoCount"]').should('contain.text', '5 items left');
    cy.get('[data-cy="filterLink"]').eq(0)
    .should('contain.text', 'All')
    .should('have.class', 'selected');
    cy.get('[data-cy="filterLink"]').eq(1).should('contain.text', 'Active');
    cy.get('[data-cy="filterLink"]').eq(2).should('contain.text', 'Completed');
  });
  it("can change filter",()=>{
    cy.get('[data-cy="filterLink"]').eq(1).click();
    cy.get('[data-cy="filterLink"]').eq(1).should('have.class', 'selected');
  });
  it("can add todo", ()=>{
    cy.get('[data-cy="newTodoInput"]').type('foo{enter}');
    cy.get('[data-cy="todoCount"]').should('contain.text', '6 items left');
    cy.get('[data-cy="todoLabel"]').eq(8).should('contain.text', 'foo');
  });
  it("can remove todo", ()=>{
    cy.get('[data-cy="destroy"]').eq(0).click({force: true});
  });
  it("can toggle a todo", ()=>{
    cy.get('[data-cy="todoCheckbox"]').eq(4).click();
    cy.get('[data-cy="todoCheckbox"]').eq(4).should('not.be.checked');
  });
  it("can toggle all todos", ()=>{
    cy.intercept({
      method:'PATCH',
      url:'http://localhost:3004/todos/*'
    },{
      body:{text: 'foo', id:1, isCompleted: true},
    });
    cy.get('[data-cy="toggleAll"]').click();
    cy.get('[data-cy="todoCheckbox"]').eq(4).should('be.checked');
    cy.get('[data-cy="todoCheckbox"]').eq(1).should('be.checked');
    cy.get('[data-cy="todoCheckbox"]').eq(2).should('not.be.checked');
  });
  it("should update a todo", ()=>{
    cy.intercept({
      method:'PATCH',
      url:'http://localhost:3004/todos/1'
    },{
      body:{text: 'bar', id:1, isCompleted: false},
    });
    cy.get('[data-cy="todoLabel"').eq(0).dblclick();
    cy.get('[data-cy="todoEdit"').type("bar{enter}");
    cy.get('[data-cy="todoLabel"').eq(0).should('contain.text', 'bar');
  })
});
