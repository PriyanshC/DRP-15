from pydantic import EmailStr

TEST_USERS = [{
    "email": EmailStr("test@mail.com"),
    "password": "test",
    "forename": "Paul",
    "surname": "Smith",
    "post_code": "SW1 1AA"
  }, {
    "email": EmailStr("test2@mail.com"),
    "password": "password",
    "forename": "Bob",
    "surname": "Tucker",
    "post_code": "SW18 5EZ"
  }, {
    "email": EmailStr("test3@mail.com"),
    "password": "password",
    "forename": "Charles",
    "surname": "Brown",
    "post_code": "BH8 9AW"
  }
]

TEST_USER_TASKS = [{
    "title": "Oven cleaning",
    "expected_price": 30,
    "frequency": 14,
    "description": "I can't reach the back of the oven when cleaning, its quite a large one!",
    "category": "domestic cleaning",
  }, {
    "title": "3 big dogs need daily walking",
    "expected_price": 20,
    "frequency": 1,
    "description": "My dogs are a little too energetic and I'm afraid I'll get hurt when I walk them.",
    "category": "dog walking",
  }, {
    "title": "Family dinner twice a month",
    "expected_price": 80,
    "frequency": 14,
    "description": "My family of 11 (4 children) comes to eat at my house every two weeks but I feel like I am getting too old to cook for so many people! However, I love to have dinner with the, so if anyone can cook for us, you have my eternal thanks!",
    "category": "other",
  }, {
    "title": "Big grocery shop every month",
    "expected_price": 30,
    "frequency": 30,
    "description": "Every month, I need to get heavy things from the store, but I cannot carry them. Please help.",
    "category": "grocery shopping",
  }, {
    "title": "Mowing lawn",
    "expected_price": 25,
    "frequency": 14,
    "description": "My grass is getting really big, I need someone to mow my lawn every two weeks or I think I'll trip on the grass!",
    "category": "gardening",
  }, {
    "title": "Whole apartment clean",
    "expected_price": 35,
    "frequency": 7,
    "description": "My health doesn't allow me to do house cleaning anymore, It isn't a big apartment. 1 bedroom, 1 living room and 1 bathroom.",
    "category": "domestic cleaning",
  }
]


TEST_TASKER_REVIEWS = [
    {
        "comment": "My lawn has never looked better! I recommend.",
        "task_id": 5,
        "tasker_id": 1,
        "overall_rating": 5,
        "punctuality": 5,
        "time_taken": 3,
        "value_for_money": 4
    }, {
        "comment": "Very sweet guy, the dogs love him!",
        "task_id": 2,
        "tasker_id": 1,
        "overall_rating": 5,
        "punctuality": 4,
        "time_taken": 5,
        "value_for_money": 4
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
    "expertise": [
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
