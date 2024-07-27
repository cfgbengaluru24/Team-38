from openai import OpenAI
from dotenv import load_dotenv
from os import getenv
import json
load_dotenv()



OPENAI_API_KEY = getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)


def translate(audio_file_name):
    audio_file = open(audio_file_name, "rb")
    translation = client.audio.translations.create(
        model="whisper-1", 
        file=audio_file
    )
    return translation.text

def call_openai(system_prompt, trainee_report):
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": trainee_report}
        ],
        temperature=0,
        response_format={"type": "json_object"}
    )
    response_text = response.choices[0].message.content
    return response_text

if __name__ == "__main__":
    # trainee_report = translate("kannada2.mp3")
    trainee_report1 = """
    Sales Overview
    This week, I sold various vegetables at the local market. Here's a breakdown of my sales:

    Tomatoes: 50 kg at ₹40/kg
    Onions: 75 kg at ₹30/kg
    Potatoes: 100 kg at ₹25/kg
    Spinach: 30 bunches at ₹15/bunch
    Carrots: 40 kg at ₹35/kg

    Expenses
    My expenses for this week were as follows:

    Vegetable procurement: ₹5,000
    Transportation to market: ₹800
    Packaging materials: ₹300
    Booth rent at market: ₹500

    Challenges and Observations

    The heavy rain on Wednesday affected my sales as fewer customers visited the market.
    Tomatoes and spinach were in high demand due to a local festival.
    I noticed that early morning sales were particularly good.

    Plans for Next Week

    I plan to increase my stock of tomatoes and spinach.
    I'm considering offering a small discount for bulk purchases to attract more customers.
    I will try to set up my booth earlier to catch the morning rush.

    Additional Notes

    I received positive feedback from customers about the freshness of my vegetables.
    A regular customer suggested I start selling herbs as well. I'm considering this for the future.
    """
    trainee_report2 = """
    # Weekly Summary Report: Bakery Business
    Trainee Name: Rahul Patel
    Week: July 20-26, 2024

    ## Sales Overview
    This week, I sold various baked goods at my small bakery shop. Here's a breakdown of my sales:

    1. Whole Wheat Bread: 80 loaves at ₹40/loaf
    2. White Bread: 100 loaves at ₹35/loaf
    3. Croissants: 150 pieces at ₹25/piece
    4. Chocolate Chip Cookies: 300 pieces at ₹10/piece
    5. Fruit Tarts: 50 pieces at ₹30/piece

    ## Expenses
    My expenses for this week were as follows:
    - Ingredients (flour, sugar, eggs, etc.): ₹4,500
    - Electricity and gas: ₹1,200
    - Packaging materials: ₹600
    - Shop rent: ₹2,000
    - Helper's salary: ₹1,500

    ## Challenges and Observations
    - There was a power outage on Tuesday morning, which delayed our baking schedule.
    - The new chocolate chip cookie recipe was very popular with customers.
    - Weekends saw significantly higher sales compared to weekdays.

    ## Plans for Next Week
    - I plan to introduce a new product: cheese straws, based on customer requests.
    - I will start a loyalty card program to encourage repeat customers.
    - I'm considering extending opening hours on weekends to capture more sales.

    ## Additional Notes
    - A local café owner inquired about supplying them with pastries. I'm exploring this potential B2B opportunity.
    - Several customers have asked for gluten-free options. I need to research recipes and gauge demand.
    """
    system_prompt = """
    You are an assistant for an NGO Best Practices Foundation.
    You are given a report of a trainee's week's summary about how their business has performed. Your task is to extract insights from the report given by the trainee.
    Only extract insights related to the business and how it performs, never the personal details of the trainee.
    For example, for the report of a vegetable business, the insights you might extract based on the report given by the trainee might be:
    - The trainee's business profits in the past week
    - The trainee's business expenses in the past week
    - Types and units of vegetables sold in the past week
    
    Similarly, figure out more insights as needed and add fields as needed, based on the report. Extract up to 10 inisghts max.
    Output in the following JSON format:
    {
        "insights": [
            {"name": "Insight 1", "value": "Value 1"},
            {"name": "Insight 2", "value": "Value 2"},
            ...
        ]
    }
    """
    response = call_openai(system_prompt, trainee_report1)
    print(response)
    insights = json.loads(response)['insights']
    
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Trainee Report Insights</title>
        <style>
            body {{ font-family: Arial, sans-serif; }}
            form {{ max-width: 600px; margin: 0 auto; }}
            label {{ display: block; margin-top: 10px; }}
            input {{ width: 100%; padding: 5px; margin-top: 5px; }}
            button {{ margin-top: 20px; padding: 10px; }}
        </style>
    </head>
    <body>
        <form id="insightsForm">
            <h2>Trainee Report Insights</h2>
            {0}
            <button type="submit">Save Changes</button>
        </form>
        <script>
            document.getElementById('insightsForm').onsubmit = function(e) {{
                e.preventDefault();
                // Here you can add code to handle form submission
                console.log('Form submitted');
            }};
        </script>
    </body>
    </html>
    """
    
    form_fields = ""
    for insight in insights:
        form_fields += f"""
            <label for="{insight['name']}">{insight['name']}:</label>
            <input type="text" id="{insight['name']}" name="{insight['name']}" value="{insight['value']}">
        """
    
    html_content = html_content.format(form_fields)
    
    with open('trainee_insights2.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print("HTML form has been generated and saved as 'trainee_insights.html'")