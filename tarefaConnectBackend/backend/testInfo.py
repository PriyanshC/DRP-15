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
  }, {
    "title": "Fix electrical outlet",
    "expected_price": 5,
    "frequency": 7,
    "description": "My electrical outlet is faulty and it feels like a safety hazard. I need someone to identify the issue, replace any damaged components, and test it for safety. Reliable power for my devices is really important. I want to keep my home safe and functional.",
    "category": "other",
  }, {
    "title": "Replace light fixture",
    "expected_price": 11,
    "frequency": 14,
    "description": "I want to replace an old light fixture to update my home's lighting. The job includes removing the old fixture, wiring, and securely installing the new one. I have a style in mind that will enhance my décor. I'm excited for improved lighting and ambiance.",
    "category": "electric",
  }, {
    "title": "Install ceiling fan",
    "expected_price": 28,
    "frequency": 20,
    "description": "I'd like to install a ceiling fan to improve air circulation and comfort in my home. This job involves mounting the fan, connecting the electrical wiring, and testing its functionality. I have a design that fits my room perfectly. I can't wait to stay cool and save on energy bills.",
    "category": "electric",
  }, {
    "title": "Repair circuit breaker",
    "expected_price": 8,
    "frequency": 3,
    "description": "My circuit breaker seems faulty and it's causing power outages. I need someone to diagnose the issue, replace the breaker, and ensure it's safe to use. Protecting my home from electrical hazards is crucial. I want to ensure reliable power distribution.",
    "category": "dog walking",
  }, {
    "title": "Upgrade electrical panel",
    "expected_price": 3,
    "frequency": 9,
    "description": "I think my electrical panel is outdated and it limits my home's power capacity. I need an upgrade that involves replacing the panel to meet modern standards. It should support additional circuits and improve safety. I want my home to handle today's electrical demands.",
    "category": "dog walking",
  }, {
    "title": "Install outdoor lighting",
    "expected_price": 19,
    "frequency": 13,
    "description": "I'd like to enhance my home's exterior with some outdoor lighting. The job includes planning the layout, wiring, and installing the fixtures. Improving security and aesthetic appeal is my goal. I want a well-lit and welcoming outdoor space.",
    "category": "electric",
  }, {
    "title": "Fix flickering lights",
    "expected_price": 4,
    "frequency": 9,
    "description": "My lights keep flickering and it's really annoying. I need someone to identify the cause, like loose connections or faulty bulbs, and fix it. I just want stable lighting in my home. Consistent illumination would be wonderful.",
    "category": "dog walking",
  }, {
    "title": "Install dimmer switch",
    "expected_price": 16,
    "frequency": 11,
    "description": "I want to install a dimmer switch to control my lighting's brightness. This job includes replacing my standard switch with a dimmer. I like the idea of adjusting the lighting to suit my mood and save energy. Creating the perfect ambiance in any room sounds great.",
    "category": "gardening",
  }, {
    "title": "Repair doorbell",
    "expected_price": 22,
    "frequency": 8,
    "description": "My doorbell isn't working and I don't want to miss visitors. I need someone to diagnose the issue, fix the wiring, or replace components if necessary. Reliable notifications are important to me. I want to keep my home welcoming and functional.",
    "category": "gardening",
  }, {
    "title": "Replace electrical wiring",
    "expected_price": 30,
    "frequency": 11,
    "description": "I have some old or damaged electrical wiring that needs replacing. This job involves removing the outdated wires and installing new ones. Efficient and safe electrical distribution is my priority. I want to protect my home from electrical fires and failures.",
    "category": "other",
  }, {
    "title": "Mow the lawn",
    "expected_price": 17,
    "frequency": 10,
    "description": "I need help keeping my lawn neat and healthy with regular mowing. The job includes cutting the grass to the appropriate height and trimming the edges. Maintaining a well-groomed yard is important to me. I want to enjoy a beautiful and inviting outdoor space.",
    "category": "gardening",
  }, {
    "title": "Trim hedges",
    "expected_price": 19,
    "frequency": 15,
    "description": "My hedges are overgrown and need trimming. I need someone to cut back the branches and shape the hedge. Enhancing my garden’s appearance is my goal. I want to promote healthy growth and prevent overgrowth.",
    "category": "gardening",
  }, {
    "title": "Plant new flowers",
    "expected_price": 23,
    "frequency": 10,
    "description": "I'd like to brighten my garden by planting new flowers. This job includes soil preparation, planting, and initial care. I have a variety of blooms that I love. I can't wait to enjoy a vibrant and colorful garden.",
    "category": "domestic cleaning",
  }, {
    "title": "Weed the garden",
    "expected_price": 4,
    "frequency": 19,
    "description": "My garden is getting overrun by weeds and I need help removing them. The task involves identifying and pulling out unwanted plants. Preventing weeds from taking over is important to me. I want to promote the healthy growth of my desired plants.",
    "category": "gardening",
  }, {
    "title": "Rake leaves",
    "expected_price": 29,
    "frequency": 4,
    "description": "I need to rake the leaves in my yard to maintain a neat appearance. The job includes gathering and disposing of the leaves. I want to prevent lawn damage and slippery surfaces. A clean and safe outdoor space is my goal.",
    "category": "plumbing",
  }, {
    "title": "Water plants",
    "expected_price": 26,
    "frequency": 4,
    "description": "My plants need regular watering to stay hydrated and healthy. This job includes checking soil moisture and applying the right amount of water. Promoting healthy growth and vibrant foliage is important to me. I want to keep my garden lush and thriving.",
    "category": "dog walking",
  }, {
    "title": "Prune trees",
    "expected_price": 4,
    "frequency": 11,
    "description": "I have some trees that need pruning to maintain their health and shape. The job involves cutting away dead or overgrown branches. Promoting healthy growth and improving appearance are my goals. I want to prevent potential hazards from falling branches.",
    "category": "gardening",
  }, {
    "title": "Fertilise lawn",
    "expected_price": 22,
    "frequency": 16,
    "description": "I'd like to fertilize my lawn to boost its health. This job includes applying the right type and amount of fertilizer. Enhancing grass growth and color is important to me. I want to keep my lawn green and lush.",
    "category": "electric",
  }, {
    "title": "Harvest vegetables",
    "expected_price": 21,
    "frequency": 1,
    "description": "I need help harvesting vegetables from my garden. The job includes picking ripe produce and preparing it for use. Ensuring optimal freshness and flavor is important to me. I want to enjoy home-grown, healthy vegetables.",
    "category": "electric",
  }, {
    "title": "Clean garden tools",
    "expected_price": 24,
    "frequency": 19,
    "description": "My garden tools need regular cleaning to stay in top condition. This job involves removing dirt, rust, and residues. Prolonging tool life and efficiency is important to me. I want to keep my gardening equipment ready for use.",
    "category": "gardening",
  }, {
    "title": "Walk the dog",
    "expected_price": 18,
    "frequency": 14,
    "description": "I need someone to walk my dog regularly to keep him happy and healthy. The job includes taking my dog on a safe, enjoyable route. Providing exercise and mental stimulation is important. I want to strengthen the bond with my pet.",
    "category": "other",
  }, {
    "title": "Feed the dog",
    "expected_price": 20,
    "frequency": 3,
    "description": "I need help feeding my dog to ensure he gets the right nutrition. The job includes preparing and serving meals according to his dietary needs. Keeping my pet healthy and satisfied is important to me. I want to maintain a consistent feeding schedule.",
    "category": "domestic cleaning",
  }, {
    "title": "Groom the dog",
    "expected_price": 30,
    "frequency": 10,
    "description": "My dog needs regular grooming to stay clean and well-kept. This job includes brushing, bathing, and trimming fur and nails. Promoting healthy skin and coat is important. I want my dog to look and feel great.",
    "category": "plumbing",
  }, {
    "title": "Take dog to vet",
    "expected_price": 29,
    "frequency": 2,
    "description": "I need someone to take my dog to the vet for regular check-ups. The job includes transportation and attending the appointment. Keeping up with vaccinations and health checks is important to me. I want to ensure my pet’s well-being.",
    "category": "dog walking",
  }, {
    "title": "Play with the dog",
    "expected_price": 10,
    "frequency": 4,
    "description": "I need help playing with my dog to keep him engaged and happy. This job includes interactive games and exercises. Providing mental and physical stimulation is important. I want to strengthen my bond with my pet.",
    "category": "dog walking",
  }, {
    "title": "Clean dog house",
    "expected_price": 19,
    "frequency": 12,
    "description": "My dog's house needs regular cleaning to stay comfortable. The job involves removing dirt, washing surfaces, and replacing bedding. Ensuring a hygienic environment is important to me. I want to keep my dog’s home fresh and cozy.",
    "category": "plumbing",
  }, {
    "title": "Train the dog",
    "expected_price": 20,
    "frequency": 8,
    "description": "I want to train my dog to learn new skills and good behavior. This job includes obedience training and behavior modification. Improving my pet’s manners and responsiveness is my goal. I want to enjoy a well-trained and happy dog.",
    "category": "domestic cleaning",
  }, {
    "title": "Pick up dog waste",
    "expected_price": 12,
    "frequency": 4,
    "description": "I need help picking up dog waste in my yard to keep it clean. The job includes collecting and disposing of the waste properly. Maintaining a hygienic outdoor space is important to me. I want a pleasant environment for everyone.",
    "category": "other",
  }, {
    "title": "Bath the dog",
    "expected_price": 10,
    "frequency": 19,
    "description": "My dog needs regular baths to stay clean and fresh. This job includes washing, rinsing, and drying my dog. Using pet-friendly products for healthy skin and coat is important. I want to enjoy a clean and happy pet.",
    "category": "domestic cleaning",
  }, {
    "title": "Replace dog bedding",
    "expected_price": 1,
    "frequency": 3,
    "description": "I need to replace my dog's bedding to ensure he has a clean and comfortable place to rest. The job involves removing the old bedding and replacing it with fresh materials. Providing a cozy sleeping area is important to me. I want to keep my pet’s bed inviting and hygienic.",
    "category": "gardening",
  }, {
    "title": "Vacuum the house",
    "expected_price": 23,
    "frequency": 18,
    "description": "I need help keeping my home clean by regularly vacuuming. The job includes cleaning floors, carpets, and upholstery. Maintaining a fresh and allergen-free environment is important to me. I want to enjoy a tidy living space.",
    "category": "domestic cleaning",
  }, {
    "title": "Mop the floors",
    "expected_price": 20,
    "frequency": 14,
    "description": "I need help to stop water wastage and save on my bills by repairing my leaky faucet. The job involves identifying the leak source, replacing worn-out parts, and ensuring a tight seal. I want the fix to be durable and eliminate those annoying drips!",
    "category": "electric",
  }, {
    "title": "Dust furniture",
    "expected_price": 1,
    "frequency": 14,
    "description": "My kitchen sink is clogged and it's halting my daily chores. I need someone to remove the blockage and restore normal drainage. The task may require tools or chemicals for a thorough clean. I just want my sink to function smoothly again.",
    "category": "electric",
  }, {
    "title": "Clean windows",
    "expected_price": 15,
    "frequency": 1,
    "description": "I want to upgrade my bathroom experience by installing a new showerhead. This job involves removing the old one and securely fitting the new one. I'm looking for better water flow and maybe some additional features. I can't wait to enjoy a refreshing shower every day!",
    "category": "domestic cleaning",
  }, {
    "title": "Do laundry",
    "expected_price": 27,
    "frequency": 5,
    "description": "My toilet keeps running and it's wasting a lot of water. I need someone to fix or replace the faulty parts, like the flapper or valve. It's important to me to reduce my water bill and ensure efficient usage. I just want my toilet to work properly.",
    "category": "domestic cleaning",
  }, {
    "title": "Iron clothes",
    "expected_price": 7,
    "frequency": 11,
    "description": "I'd like to replace the tiles in my bathroom to give it a fresh new look. The job includes removing old tiles, preparing the surface, and installing new ones. I have a design in mind that I really like. I want my bathroom to look clean and updated.",
    "category": "plumbing",
  }, {
    "title": "Clean bathroom",
    "expected_price": 3,
    "frequency": 12,
    "description": "My drain is blocked and it's causing bad odors and water backup. I need someone to clear the blockage using specialized tools and techniques. I want the water to flow smoothly again and prevent future clogs. Keeping my home hygienic is really important to me.",
    "category": "electric",
  }, {
    "title": "Organise closet",
    "expected_price": 29,
    "frequency": 12,
    "description": "I want to install a new kitchen sink to upgrade my kitchen. This task involves removing the old sink, fitting the new one, and connecting the plumbing. I have a specific sink that I think will be perfect. I can't wait to have a functional and stylish kitchen centerpiece.",
    "category": "electric",
  }, {
    "title": "Wash dishes",
    "expected_price": 14,
    "frequency": 8,
    "description": "My water heater needs repair to ensure I always have hot water. I need someone to diagnose the issue, replace any faulty parts, and restore efficient operation. I really want to avoid cold showers and high energy bills. Having consistent hot water is crucial.",
    "category": "dog walking",
  }, {
    "title": "Clean the kitchen",
    "expected_price": 18,
    "frequency": 20,
    "description": "I need to replace some old pipes that are causing leaks and water quality issues. The job involves removing the outdated pipes and installing new ones. I want to ensure reliable water flow and prevent any damage. Modern plumbing is important for my home.",
    "category": "other",
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
