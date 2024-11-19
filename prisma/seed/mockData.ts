import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('a75aacf2-90f0-4ed5-9cd9-cd19113ea6c8', '1Jonathan7@yahoo.com', 'Alex Johnson', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inv345mno', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('fc6d0a9e-7c8c-47e6-9960-6e99c0e3210a', '9Morgan4@gmail.com', 'Emily Davis', 'https://i.imgur.com/YfJQV5z.png?id=11', 'inv345mno', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('11723699-6f68-497c-adbc-8c28becb5ce5', '17Arvid51@hotmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=19', 'inv456def', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('53a23729-e714-4e3b-939f-ae0cb69faadf', '25Hildegard44@yahoo.com', 'Emily Davis', 'https://i.imgur.com/YfJQV5z.png?id=27', 'inv012jkl', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('f7ef029f-392f-4329-9a98-143b60c4cff0', '33Wendell93@yahoo.com', 'Alex Johnson', 'https://i.imgur.com/YfJQV5z.png?id=35', 'inv012jkl', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('59ba5724-c3ae-40ef-a7de-7900914e43cb', '41Curt36@yahoo.com', 'Alex Johnson', 'https://i.imgur.com/YfJQV5z.png?id=43', 'inv456def', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('c7067d62-1e32-449f-b7ae-dab0f46699e0', '49Sydney43@gmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=51', 'inv345mno', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('9ce41de1-d82d-472a-8592-e17ba63090c5', '57Kennedy22@gmail.com', 'Alex Johnson', 'https://i.imgur.com/YfJQV5z.png?id=59', 'inv789ghi', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('a329fb7e-7e35-4b45-b70f-1818752148d1', '65Stuart.Hegmann@gmail.com', 'Emily Davis', 'https://i.imgur.com/YfJQV5z.png?id=67', 'inv789ghi', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "SubscriptionPlan" ("id", "name", "price", "credits", "features", "duration") VALUES ('4f39cd35-372e-4e93-b677-090224984ebb', 'Standard', '49.99', 273, '{"damnatio":"alter","comminor":"depereo","venustas":"textus","velit":"numquam"}'::jsonb, 12);
INSERT INTO "SubscriptionPlan" ("id", "name", "price", "credits", "features", "duration") VALUES ('aed51544-87f4-435e-8fbf-abcad494e041', 'Pro', '49.99', 328, '{"viduo":"pectus","ultra":"auctor","crur":"ducimus"}'::jsonb, 527);
INSERT INTO "SubscriptionPlan" ("id", "name", "price", "credits", "features", "duration") VALUES ('daf21f83-7555-46aa-b898-24aca0b53b82', 'Standard', '19.99', 156, '{"vestigium":"acquiro","cruciamentum":"vulnus","tenetur":"celebrer"}'::jsonb, 27);
INSERT INTO "SubscriptionPlan" ("id", "name", "price", "credits", "features", "duration") VALUES ('0eebff38-3199-4237-af41-e5b93441700b', 'Standard', '29.99', 758, '{"curto":"viridis","rerum":"vulticulus","aptus":"ambitus","totidem":"eos","aperio":"aduro"}'::jsonb, 860);
INSERT INTO "SubscriptionPlan" ("id", "name", "price", "credits", "features", "duration") VALUES ('40d6d0d9-2483-4bf2-89f2-2bf96b8e7b5e', 'Basic', '19.99', 13, '{"placeat":"nobis","usque":"beatus","incidunt":"advenio","accusator":"cuppedia"}'::jsonb, 995);
INSERT INTO "SubscriptionPlan" ("id", "name", "price", "credits", "features", "duration") VALUES ('db49f941-d3b5-44fc-ba93-b50bc6d21641', 'Pro', '19.99', 696, '{"nisi":"uxor","defluo":"canis","bardus":"assentator","pauper":"ter"}'::jsonb, 626);
INSERT INTO "SubscriptionPlan" ("id", "name", "price", "credits", "features", "duration") VALUES ('1197f494-9ad6-4a70-87d0-0b95b06ae7e6', 'Premium', '49.99', 502, '{"patruus":"cito","sub":"autus","adulescens":"traho"}'::jsonb, 448);
INSERT INTO "SubscriptionPlan" ("id", "name", "price", "credits", "features", "duration") VALUES ('1995bfa6-953f-4df6-97f2-1dfb215008bc', 'Enterprise', '99.99', 877, '{"validus":"attonbitus","acsi":"eos","tracto":"artificiose","iure":"vilicus","amissio":"cubo"}'::jsonb, 840);
INSERT INTO "SubscriptionPlan" ("id", "name", "price", "credits", "features", "duration") VALUES ('f85d3146-8aee-4d7c-9e55-e1db1263b498', 'Standard', '99.99', 414, '{"victoria":"vulnus","pariatur":"tracto","triumphus":"sub","suscipio":"speculum"}'::jsonb, 149);
INSERT INTO "SubscriptionPlan" ("id", "name", "price", "credits", "features", "duration") VALUES ('dfb49892-32b5-4148-8156-6931b3b63ad4', 'Basic', '29.99', 402, '{"administratio":"omnis","fugiat":"tepesco","delibero":"audio"}'::jsonb, 594);

INSERT INTO "Subscription" ("id", "startDate", "endDate", "status", "stripeSubscriptionId", "userId", "planId") VALUES ('67547b19-b3ef-4d63-aff3-ec0e484c766b', '2025-01-30T09:23:29.313Z', '2024-06-12T09:41:24.229Z', 'inactive', 'sub_1JH2Y2A3B4C5D6E7F8G9H0', 'a75aacf2-90f0-4ed5-9cd9-cd19113ea6c8', 'dfb49892-32b5-4148-8156-6931b3b63ad4');
INSERT INTO "Subscription" ("id", "startDate", "endDate", "status", "stripeSubscriptionId", "userId", "planId") VALUES ('7f21189d-5faf-433f-a081-156e8174b3dd', '2024-03-25T23:56:53.430Z', '2024-03-14T02:14:56.868Z', 'inactive', 'sub_5O6P7Q8R9S0T1U2V3W4X5', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '40d6d0d9-2483-4bf2-89f2-2bf96b8e7b5e');
INSERT INTO "Subscription" ("id", "startDate", "endDate", "status", "stripeSubscriptionId", "userId", "planId") VALUES ('c5deac0d-11a4-413d-a89c-a6f945471f6c', '2024-05-06T02:39:25.984Z', '2024-08-19T11:53:14.423Z', 'trial', 'sub_3U4V5W6X7Y8Z9A0B1C2D3', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '0eebff38-3199-4237-af41-e5b93441700b');
INSERT INTO "Subscription" ("id", "startDate", "endDate", "status", "stripeSubscriptionId", "userId", "planId") VALUES ('8c5278d6-4639-4240-b612-01db40753a18', '2024-07-06T00:51:12.184Z', '2025-03-14T14:13:49.590Z', 'canceled', 'sub_2KJ3L4M5N6O7P8Q9R0S1T2', '59ba5724-c3ae-40ef-a7de-7900914e43cb', 'daf21f83-7555-46aa-b898-24aca0b53b82');
INSERT INTO "Subscription" ("id", "startDate", "endDate", "status", "stripeSubscriptionId", "userId", "planId") VALUES ('52b41c1d-5dec-442d-8a59-9df62890af6c', '2024-10-17T08:03:02.816Z', '2024-05-22T08:33:33.737Z', 'inactive', 'sub_3U4V5W6X7Y8Z9A0B1C2D3', '9ce41de1-d82d-472a-8592-e17ba63090c5', '1995bfa6-953f-4df6-97f2-1dfb215008bc');
INSERT INTO "Subscription" ("id", "startDate", "endDate", "status", "stripeSubscriptionId", "userId", "planId") VALUES ('b3377f62-bd6b-4fe1-bd9a-f84a83dc86f4', '2025-10-05T09:38:57.173Z', '2024-10-27T20:50:30.435Z', 'pending', 'sub_1JH2Y2A3B4C5D6E7F8G9H0', 'a75aacf2-90f0-4ed5-9cd9-cd19113ea6c8', '1197f494-9ad6-4a70-87d0-0b95b06ae7e6');
INSERT INTO "Subscription" ("id", "startDate", "endDate", "status", "stripeSubscriptionId", "userId", "planId") VALUES ('5687930b-c09e-4a42-a5b6-1f6871e1a367', '2025-05-21T07:25:51.941Z', '2024-09-23T17:46:01.511Z', 'inactive', 'sub_3U4V5W6X7Y8Z9A0B1C2D3', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'f85d3146-8aee-4d7c-9e55-e1db1263b498');
INSERT INTO "Subscription" ("id", "startDate", "endDate", "status", "stripeSubscriptionId", "userId", "planId") VALUES ('00e281cc-7bbd-49da-9e3b-b9115d0d59f2', '2025-06-05T00:23:50.982Z', '2024-07-19T10:57:49.882Z', 'inactive', 'sub_2KJ3L4M5N6O7P8Q9R0S1T2', 'f7ef029f-392f-4329-9a98-143b60c4cff0', '0eebff38-3199-4237-af41-e5b93441700b');
INSERT INTO "Subscription" ("id", "startDate", "endDate", "status", "stripeSubscriptionId", "userId", "planId") VALUES ('a1077834-78c5-4199-928f-3f6e1dd0fb42', '2025-03-14T00:49:25.663Z', '2025-10-04T10:23:27.597Z', 'pending', 'sub_2KJ3L4M5N6O7P8Q9R0S1T2', '11723699-6f68-497c-adbc-8c28becb5ce5', '1995bfa6-953f-4df6-97f2-1dfb215008bc');
INSERT INTO "Subscription" ("id", "startDate", "endDate", "status", "stripeSubscriptionId", "userId", "planId") VALUES ('85fbe8a3-df9f-4a5f-9780-1f360e21881a', '2024-10-13T23:51:50.516Z', '2024-11-16T06:06:02.661Z', 'pending', 'sub_1JH2Y2A3B4C5D6E7F8G9H0', 'c7067d62-1e32-449f-b7ae-dab0f46699e0', 'dfb49892-32b5-4148-8156-6931b3b63ad4');

INSERT INTO "Prompt" ("id", "inputDescription", "generatedPrompt", "isFavorite", "topic", "userId") VALUES ('ac6306db-ecbc-4375-8aa7-07dec119c142', 'Develop a business plan for a startup in the food industry', 'Formulate a detailed business proposal covering market analysis financial projections and operational plans.', true, 'Fashion', 'c7067d62-1e32-449f-b7ae-dab0f46699e0');
INSERT INTO "Prompt" ("id", "inputDescription", "generatedPrompt", "isFavorite", "topic", "userId") VALUES ('f06d7f39-ccb4-4161-92e2-e2e133f36298', 'Draft an email campaign for a holiday sale', 'Craft a series of engaging emails with personalized offers and eyecatching visuals to boost holiday sales.', false, 'Retail', '53a23729-e714-4e3b-939f-ae0cb69faadf');
INSERT INTO "Prompt" ("id", "inputDescription", "generatedPrompt", "isFavorite", "topic", "userId") VALUES ('2b295180-54f8-4fb2-a07e-9d62eb781c48', 'Write a blog post about the benefits of meditation', 'Design a monthlong content schedule including posts stories and engagement strategies for Instagram and Facebook.', false, 'Retail', 'a75aacf2-90f0-4ed5-9cd9-cd19113ea6c8');
INSERT INTO "Prompt" ("id", "inputDescription", "generatedPrompt", "isFavorite", "topic", "userId") VALUES ('fd4ef306-dcca-4320-b757-a289deb0cf82', 'Develop a business plan for a startup in the food industry', 'Compose a 1000word article highlighting the mental and physical advantages of regular meditation practice.', false, 'Marketing', '9ce41de1-d82d-472a-8592-e17ba63090c5');
INSERT INTO "Prompt" ("id", "inputDescription", "generatedPrompt", "isFavorite", "topic", "userId") VALUES ('e7c455c3-4352-4abb-8474-910c2e8aed72', 'Generate a social media calendar for a fashion brand', 'Outline a comprehensive marketing plan focusing on digital channels and influencer partnerships.', true, 'Entrepreneurship', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Prompt" ("id", "inputDescription", "generatedPrompt", "isFavorite", "topic", "userId") VALUES ('10549f4a-af61-4a38-9a14-0006278454a7', 'Generate a social media calendar for a fashion brand', 'Formulate a detailed business proposal covering market analysis financial projections and operational plans.', false, 'Fashion', 'a75aacf2-90f0-4ed5-9cd9-cd19113ea6c8');
INSERT INTO "Prompt" ("id", "inputDescription", "generatedPrompt", "isFavorite", "topic", "userId") VALUES ('756172f4-60f5-4032-9697-cc37f7c1eb09', 'Draft an email campaign for a holiday sale', 'Design a monthlong content schedule including posts stories and engagement strategies for Instagram and Facebook.', false, 'Entrepreneurship', '53a23729-e714-4e3b-939f-ae0cb69faadf');
INSERT INTO "Prompt" ("id", "inputDescription", "generatedPrompt", "isFavorite", "topic", "userId") VALUES ('a0479dca-4ca7-4a04-9bad-6c78d397a6ad', 'Create a marketing strategy for a new tech product', 'Outline a comprehensive marketing plan focusing on digital channels and influencer partnerships.', false, 'Entrepreneurship', '59ba5724-c3ae-40ef-a7de-7900914e43cb');
INSERT INTO "Prompt" ("id", "inputDescription", "generatedPrompt", "isFavorite", "topic", "userId") VALUES ('9fc28c15-1c93-475f-b325-24de4d5d2db9', 'Generate a social media calendar for a fashion brand', 'Outline a comprehensive marketing plan focusing on digital channels and influencer partnerships.', true, 'Wellness', '53a23729-e714-4e3b-939f-ae0cb69faadf');
INSERT INTO "Prompt" ("id", "inputDescription", "generatedPrompt", "isFavorite", "topic", "userId") VALUES ('81713dd5-b925-4d18-98fb-4b326d6cdb7e', 'Write a blog post about the benefits of meditation', 'Formulate a detailed business proposal covering market analysis financial projections and operational plans.', true, 'Wellness', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "Suggestion" ("id", "topic", "description", "example") VALUES ('e8558545-47a9-49a5-9256-951ea1c497e1', 'Blockchain for Supply Chain', 'Exploring innovative methods to enhance online presence.', 'Generate a prompt for a research paper on AI applications in healthcare.');
INSERT INTO "Suggestion" ("id", "topic", "description", "example") VALUES ('bf3f3abe-e1bd-4e8c-8724-65b493d483b2', 'Blockchain for Supply Chain', 'Utilizing artificial intelligence to improve patient outcomes.', 'Generate a prompt for a research paper on AI applications in healthcare.');
INSERT INTO "Suggestion" ("id", "topic", "description", "example") VALUES ('ebacd10b-9822-4f1c-9d85-334892c6739e', 'Remote Work Productivity', 'Developing ecofriendly energy alternatives for the future.', 'Generate a prompt for a research paper on AI applications in healthcare.');
INSERT INTO "Suggestion" ("id", "topic", "description", "example") VALUES ('a96d2473-d199-459c-9862-9d201c252b6c', 'Blockchain for Supply Chain', 'Developing ecofriendly energy alternatives for the future.', 'Craft a prompt for an article on best practices for remote work.');
INSERT INTO "Suggestion" ("id", "topic", "description", "example") VALUES ('d378886c-7fd8-426d-b72d-cfe86c9650c9', 'Sustainable Energy Solutions', 'Maximizing efficiency and collaboration in remote teams.', 'Craft a prompt for an article on best practices for remote work.');
INSERT INTO "Suggestion" ("id", "topic", "description", "example") VALUES ('49701fe6-ab72-41cc-8f22-2338f50afa9d', 'Sustainable Energy Solutions', 'Exploring innovative methods to enhance online presence.', 'Create a prompt for a blog post on digital marketing trends.');
INSERT INTO "Suggestion" ("id", "topic", "description", "example") VALUES ('a5ac598a-9dc9-46b9-ad91-4dca7e525c9a', 'Sustainable Energy Solutions', 'Maximizing efficiency and collaboration in remote teams.', 'Develop a prompt for a presentation on renewable energy technologies.');
INSERT INTO "Suggestion" ("id", "topic", "description", "example") VALUES ('94f546e4-a425-4aee-9468-edec03e3fd09', 'Blockchain for Supply Chain', 'Exploring innovative methods to enhance online presence.', 'Formulate a prompt for a case study on blockchain in supply chain management.');
INSERT INTO "Suggestion" ("id", "topic", "description", "example") VALUES ('a10f41dc-2ea4-4194-a923-b83cf82a795d', 'AI in Healthcare', 'Implementing blockchain technology to streamline logistics.', 'Create a prompt for a blog post on digital marketing trends.');
INSERT INTO "Suggestion" ("id", "topic", "description", "example") VALUES ('042d14b3-e0b8-4f7c-a632-0b55b10ded16', 'Digital Marketing Strategies', 'Developing ecofriendly energy alternatives for the future.', 'Develop a prompt for a presentation on renewable energy technologies.');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
