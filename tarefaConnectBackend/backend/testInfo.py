from pydantic import EmailStr

TEST_USER = {
    "email": EmailStr("test@mail.com"),
    "password": "test",
    "forename": "Paulo",
    "surname": "Rui",
    "post_code": "SW1 1AA"
}

TEST_USER_TASKS = [{
    "title": "Fix leaky faucet",
    "expected_price": 2,
    "frequency": 8,
    "description": "I need help to stop water wastage and save on my bills by repairing my leaky faucet. The job involves identifying the leak source, replacing worn-out parts, and ensuring a tight seal. I want the fix to be durable and eliminate those annoying drips!",
    "category": "other",
  }, {
    "title": "Unclog kitchen sink",
    "expected_price": 24,
    "frequency": 18,
    "description": "My kitchen sink is clogged and it's halting my daily chores. I need someone to remove the blockage and restore normal drainage. The task may require tools or chemicals for a thorough clean. I just want my sink to function smoothly again.",
    "category": "dog walking",
  }, {
    "title": "Install new showerhead",
    "expected_price": 28,
    "frequency": 7,
    "description": "I want to upgrade my bathroom experience by installing a new showerhead. This job involves removing the old one and securely fitting the new one. I'm looking for better water flow and maybe some additional features. I can't wait to enjoy a refreshing shower every day!",
    "category": "electric",
  }, {
    "title": "Repair running toilet",
    "expected_price": 21,
    "frequency": 6,
    "description": "My toilet keeps running and it's wasting a lot of water. I need someone to fix or replace the faulty parts, like the flapper or valve. It's important to me to reduce my water bill and ensure efficient usage. I just want my toilet to work properly.",
    "category": "other",
  }, {
    "title": "Replace bathroom tiles",
    "expected_price": 30,
    "frequency": 5,
    "description": "I'd like to replace the tiles in my bathroom to give it a fresh new look. The job includes removing old tiles, preparing the surface, and installing new ones. I have a design in mind that I really like. I want my bathroom to look clean and updated.",
    "category": "gardening",
  }, {
    "title": "Clear blocked drain",
    "expected_price": 21,
    "frequency": 4,
    "description": "My drain is blocked and it's causing bad odors and water backup. I need someone to clear the blockage using specialized tools and techniques. I want the water to flow smoothly again and prevent future clogs. Keeping my home hygienic is really important to me.",
    "category": "other",
  }, {
    "title": "Install kitchen sink",
    "expected_price": 5,
    "frequency": 8,
    "description": "I want to install a new kitchen sink to upgrade my kitchen. This task involves removing the old sink, fitting the new one, and connecting the plumbing. I have a specific sink that I think will be perfect. I can't wait to have a functional and stylish kitchen centerpiece.",
    "category": "dog walking",
  }, {
    "title": "Repair water heater",
    "expected_price": 6,
    "frequency": 15,
    "description": "My water heater needs repair to ensure I always have hot water. I need someone to diagnose the issue, replace any faulty parts, and restore efficient operation. I really want to avoid cold showers and high energy bills. Having consistent hot water is crucial.",
    "category": "gardening",
  }, {
    "title": "Replace old pipes",
    "expected_price": 20,
    "frequency": 7,
    "description": "I need to replace some old pipes that are causing leaks and water quality issues. The job involves removing the outdated pipes and installing new ones. I want to ensure reliable water flow and prevent any damage. Modern plumbing is important for my home.",
    "category": "domestic cleaning",
  }, {
    "title": "Install new dishwasher",
    "expected_price": 3,
    "frequency": 14,
    "description": "I want to install a new dishwasher to make my kitchen chores easier. This service includes setting up the appliance, connecting water and drainage lines, and making sure it operates properly. I want to save time and energy. Spotless dishes with minimal effort sound great to me!",
    "category": "domestic cleaning",
  }]


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
