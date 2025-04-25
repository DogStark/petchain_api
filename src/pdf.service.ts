import * as PdfPrinter from 'pdfmake';
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { Response } from 'express';

@Injectable()
export class PdfService {
  private fonts = {
    Roboto: {
      normal: path.join(__dirname, 'fonts/Roboto-Regular.ttf'),
      bold: path.join(__dirname, 'fonts/Roboto-Bold.ttf'),
      italics: path.join(__dirname, 'fonts/Roboto-Italic.ttf'),
      bolditalics: path.join(__dirname, 'fonts/Roboto-BoldItalic.ttf'),
    },
  };

  private printer = new PdfPrinter(this.fonts);

  generatePetPDF(res: Response, petData: any) {
    const docDefinition = {
      content: [
        { text: 'Pet Registration Info', style: 'header' },
        `Name: ${petData.name}`,
        `Breed: ${petData.breed}`,
        `Age: ${petData.age}`,

        { text: '\nOwner Info', style: 'subheader' },
        `Name: ${petData.owner.name}`,
        `Phone: ${petData.owner.phone}`,

        { text: '\nVaccines', style: 'subheader' },
        {
          ul: petData.vaccines.map(v => `${v.name} - ${v.date}`),
        },

        { text: '\nTreatments', style: 'subheader' },
        {
          ul: petData.treatments.map(t => `${t.description} - ${t.date}`),
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true },
        subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 4] },
      },
    };

    const pdfDoc = this.printer.createPdfKitDocument(docDefinition);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=pet_${petData.id}.pdf`);
    pdfDoc.pipe(res);
    pdfDoc.end();
  }
}
