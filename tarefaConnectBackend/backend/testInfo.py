from pydantic import EmailStr

TEST_USER = {
    "email": EmailStr("test@mail.com"),
    "password": "test",
    "forename": "test",
    "surname": "test",
    "post_code": "SW1 1AA"
}

TEST_USER_TASKS = [
    {
        "title": 'Gardening Every Week',
        "description": 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus dolores minus, quo fuga '
                       'possimus iure iusto commodi voluptatibus, aut architecto nesciunt est amet reiciendis quas '
                       'odit suscipit laudantium quis hic.',
        "frequency": 7,
        "expected_price": 12.30
    },
    {
        "title": "Gardening every two Week",
        "description": 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus dolores minus, quo fuga '
                       'possimus iure iusto commodi voluptatibus, aut architecto nesciunt est amet reiciendis quas '
                       'odit suscipit laudantium quis hic.',
        "frequency": 14,
        "expected_price": 11.30
    },
    {
        "title": "Repairs",
        "description": 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus dolores minus, quo fuga '
                       'possimus iure iusto commodi voluptatibus, aut architecto nesciunt est amet reiciendis quas '
                       'odit suscipit laudantium quis hic.',
        "frequency": 1,
        "expected_price": 10.30
    }
]
