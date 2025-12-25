import pdfplumber
import re
from pdf2image import convert_from_bytes
import pytesseract


def clean_text(text: str) -> str:
    """Clean resume text for NLP"""
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[•▪●■]', ' ', text)
    return text.strip().lower()


def extract_text_from_pdf(pdf_file) -> str:
    text_chunks = []

    # --- 1️⃣ Try text-based extraction ---
    with pdfplumber.open(pdf_file) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text(x_tolerance=2, y_tolerance=2)
            if page_text:
                text_chunks.append(page_text)

    combined_text = " ".join(text_chunks).strip()

    if combined_text:
        return clean_text(combined_text)

    # --- 2️⃣ OCR fallback (scanned resumes) ---
    pdf_file.seek(0)  # 🚨 CRITICAL
    images = convert_from_bytes(pdf_file.read())

    ocr_text = ""
    for img in images:
        ocr_text += pytesseract.image_to_string(img)

    return clean_text(ocr_text)





