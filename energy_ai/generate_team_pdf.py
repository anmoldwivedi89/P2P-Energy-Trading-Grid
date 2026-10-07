from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer

OUTPUT = 'AI_Service_Team_Guide.pdf'

styles = getSampleStyleSheet()
story = []

story.append(Paragraph('Energy AI Model Service – Team Integration Guide', styles['Title']))
story.append(Spacer(1, 0.3 * inch))
story.append(Paragraph('This service predicts demand, generation, and price for the P2P energy marketplace.', styles['BodyText']))
story.append(Spacer(1, 0.2 * inch))

sections = [
    ('Overview', 'The service exposes three HTTP endpoints for energy prediction. It loads saved scikit-learn models from the models folder and serves predictions through FastAPI.'),
    ('Training', 'Models are trained using scikit-learn regression algorithms such as RandomForestRegressor and GradientBoostingRegressor. There are no explicit epochs because these are not neural networks; training is handled by model.fit().'),
    ('Run commands', 'From project root: python -m training.train_demand_model; python -m training.train_generation_model; python -m training.train_price_model. Then start: uvicorn api.main:app --reload --port 8000.'),
    ('API base URL', 'http://localhost:8000'),
    ('Endpoints', 'POST /predict/demand, POST /predict/generation, POST /predict/price'),
    ('Fallback behavior', 'If the AI service is unavailable, the frontend/backend should show: "AI recommendation temporarily unavailable".'),
]

for title, text in sections:
    story.append(Paragraph(f'<b>{title}</b>', styles['Heading2']))
    story.append(Paragraph(text, styles['BodyText']))
    story.append(Spacer(1, 0.15 * inch))

story.append(Paragraph('<b>Example payloads</b>', styles['Heading2']))
story.append(Paragraph('Demand: {"hour":19,"day_of_week":2,"temperature":30,"humidity":55,"previous_demand":2.1,"holiday":0}', styles['BodyText']))
story.append(Paragraph('Generation: {"temperature":32,"humidity":40,"cloud_cover":10,"solar_irradiance":800,"hour":13,"month":5}', styles['BodyText']))
story.append(Paragraph('Price: {"demand_kwh":3.5,"generation_kwh":1.2,"hour":19,"day_of_week":2,"previous_price":7.0}', styles['BodyText']))
story.append(Spacer(1, 0.2 * inch))
story.append(Paragraph('<b>Response examples</b>', styles['Heading2']))
story.append(Paragraph('{"expected_demand_kwh": 2.91}', styles['BodyText']))
story.append(Paragraph('{"expected_generation_kwh": 4.73}', styles['BodyText']))
story.append(Paragraph('{"recommended_price_per_kwh": 8.42}', styles['BodyText']))
story.append(Spacer(1, 0.2 * inch))
story.append(Paragraph('This document summarizes the AI service contract for the frontend and backend teams.', styles['BodyText']))

pdf = SimpleDocTemplate(
    OUTPUT,
    pagesize=A4,
    rightMargin=0.7 * inch,
    leftMargin=0.7 * inch,
    topMargin=0.7 * inch,
    bottomMargin=0.7 * inch,
)
pdf.build(story)
print(f'Created {OUTPUT}')
