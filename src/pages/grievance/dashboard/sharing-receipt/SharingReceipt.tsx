'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { pdf, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

// PDF Document component
const MyDocument = () => (
  <Document>
    <Page size={[3 * 72, 'auto']} style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Sample PDF</Text>
        <Text style={styles.text}>This is a sample PDF generated with react-pdf.</Text>
        <Text style={styles.text}>The width is set to 3 inches (216 points).</Text>
        <Text style={styles.text}>The height is dynamic and will adjust based on content.</Text>
      </View>
    </Page>
  </Document>
);

// The main algo
// 1 complete the sml in 1 month (eg: Feb)
// 2 You can set a stb bs over that
// 3 you can start development after that

// Main React component
const PDFGenerator: React.FC = () => {
  const generatePDF = async () => {
    const blob = await pdf(<MyDocument />).toBlob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'generated_pdf.pdf'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>PDF Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={generatePDF}>Generate and Download PDF</Button>
      </CardContent>
    </Card>
  )
}

export default PDFGenerator

