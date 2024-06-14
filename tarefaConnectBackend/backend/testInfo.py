from pydantic import EmailStr

TEST_USER = {
    "email": EmailStr("test@mail.com"),
    "password": "test",
    "forename": "Paulo",
    "surname": "Rui",
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


TEST_TASKER = {
    "forename": 'Jason',
    "surname": ' Mimosa',
    "email": "jason@mail.com",
    "password": "password",
    "post_code": 'W5 4TN',
    "headline": "Hello! I'm Sam Johnson, a dedicated and passionate gardening amateur based in the beautiful city of "
                "Minneapolis. With over 15 years of experience in the gardening and landscaping my own garden, I have "
                "honed my skills to transform my outdoor space into a lush, vibrant garden.Let's work together to "
                "create the garden of your dreams! Whether you need a complete garden makeover or just a little help "
                "with maintenance, I'm here to help. Give me a call or send me an email, and let's get started on your "
                "next gardening project.",
    "expertises": [
      {
        "title": "Lawn Care",
        "description": "I currently tend to several people's gardens, mowing them once a week, as well as watering some"
                       " people's houseplants."
      },
      {
        "title": "Plant Trimming",
        "description": "I also have a plant trimming set, and have sculpted friends and family bushes for about a year"
                       " now!"
      }
    ]
}
