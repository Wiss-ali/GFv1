import React from "react";
import { useState } from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { Formik, Form, Field } from "formik";
import PDFPreview from "./PDFPreview";

const DEFAULT_LEGAL_TEXT =
  "Nous nous réservons la propriété des matériels et fournitures jusqu'au paiement comptant par l'acheteur (loi n°80 335 du 12 mai 1980)";
const DEFAULT_BANK_DETAILS =
  "Banque GGGGGGG - Titulaire du compte : SCI TORI IBAN FR 76 0000 0000 0000 0000 0000 000 BIC : 1234567 Société par actions simplifiée (SAS) - Capital de 20 000 € - SIRET: 1234567 NAF-APE: 0000Z - Numéro TVA: 12345678";

const InvoicePDF = ({ data }) => {
  const totalHT = data.prix * data.quantite;
  const tvaAmount = (totalHT * data.tva) / 100;
  const totalTTC = totalHT + tvaAmount;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Facture {data.factureNumber}</Text>
          <Text style={styles.date}>
            Date facturation : {data.dateFacturation}
          </Text>
          <Text style={styles.date}>Date échéance : {data.dateEcheance}</Text>
        </View>

        <View style={styles.addressSection}>
          <View style={styles.emetteurSection}>
            <Text style={styles.addressLabel}>Émetteur</Text>
            <View style={styles.greyBox}>
              <Text style={styles.companyInfo}>SCI TORI</Text>
              <Text style={styles.companyInfo}>150 RUE DE GERLAND</Text>
              <Text style={styles.companyInfo}>69007 LYON</Text>
              <Text style={styles.companyInfo}>0678369633</Text>
              <Text style={styles.companyInfo}>contact@jtbrands.fr</Text>
            </View>
          </View>

          <View style={styles.destinataireSection}>
            <Text style={styles.addressLabel}>Adressé à</Text>
            <View style={styles.whiteBox}>
              <Text style={styles.companyInfo}>
                Madame BELOUSSA-CHERIFI Anais
              </Text>
              <Text style={styles.companyInfo}>150 RUE DE GERLAND</Text>
              <Text style={styles.companyInfo}>69007 LYON</Text>
            </View>
          </View>
        </View>

        <Text style={styles.currencyNote}>Montants exprimés en Euros</Text>

        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.colDesignation}>Désignation</Text>
            <Text style={styles.colTVA}>TVA</Text>
            <Text style={styles.colPU}>P.U. HT</Text>
            <Text style={styles.colQte}>Qté</Text>
            <Text style={styles.colTotal}>Total HT</Text>
          </View>

          <View style={styles.tableContent}>
            <Text style={styles.colDesignation}>{data.designation}</Text>
            <Text style={styles.colTVA}>{data.tva}%</Text>
            <Text style={styles.colPU}>{Number(data.prix).toFixed(2)}</Text>
            <Text style={styles.colQte}>{data.quantite}</Text>
            <Text style={styles.colTotal}>
              {(data.prix * data.quantite).toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <Text style={styles.conditions}>
            Conditions de règlement: À réception
          </Text>
          <View style={styles.totalsSection}>
            <View style={styles.totalRow}>
              <Text>Total HT</Text>
              <Text>{totalHT.toFixed(2)} €</Text>
            </View>
            <View style={styles.totalRow}>
              <Text>TVA {data.tva}%</Text>
              <Text>{tvaAmount.toFixed(2)} €</Text>
            </View>
            <View style={[styles.ttcBackground, styles.totalRow]}>
              <Text>Total TTC</Text>
              <Text>{totalTTC.toFixed(2)} €</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.legalText}>{data.legalText}</Text>
          <Text style={styles.bankDetails}>{data.bankDetails}</Text>
          <Text style={styles.pageNumber}>1 / 1</Text>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    alignItems: "flex-end",
    marginBottom: 30,
  },
  title: {
    fontSize: 11,
    marginBottom: 5,
  },
  date: {
    fontSize: 9,
  },
  addressSection: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 20,
  },
  emetteurSection: {
    width: "45%",
  },
  destinataireSection: {
    width: "55%",
  },
  addressLabel: {
    marginBottom: 5,
    fontSize: 10,
  },
  greyBox: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    height: 120,
  },
  whiteBox: {
    border: 1,
    padding: 10,
    height: 120,
  },
  companyInfo: {
    fontSize: 9,
    marginBottom: 3,
  },
  currencyNote: {
    fontSize: 8,
    textAlign: "right",
    marginBottom: 10,
  },
  tableContainer: {
    border: 1,
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: 1,
  },
  tableContent: {
    flexDirection: "row",
    minHeight: 350,
  },
  colDesignation: {
    width: "40%",
    padding: 5,
    borderRight: 1,
    fontSize: 8,
  },
  colTVA: {
    width: "15%",
    padding: 5,
    borderRight: 1,
    textAlign: "center",
  },
  colPU: {
    width: "15%",
    padding: 5,
    borderRight: 1,
    textAlign: "right",
  },
  colQte: {
    width: "15%",
    padding: 5,
    borderRight: 1,
    textAlign: "center",
  },
  colTotal: {
    width: "15%",
    padding: 5,
    textAlign: "right",
  },
  bottomSection: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  conditions: {
    fontSize: 9,
  },
  totalsSection: {
    width: "30%",
  },
  ttcBackground: {
    backgroundColor: "#e0e0e0",
    padding: 2,
    marginTop: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
  },
  legalText: {
    fontSize: 7,
    marginBottom: 2,
  },
  bankDetails: {
    fontSize: 7,
    marginBottom: 5,
  },
  pageNumber: {
    fontSize: 8,
    textAlign: "right",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
});

const InvoiceForm = ({ onSubmit }) => {
  const tvaOptions = [5.5, 10, 20];
  const qteOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleSubmit = (values) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    onSubmit({
      ...values,
      factureNumber: `2024-${values.month}`,
      dateFacturation: today.toISOString().split("T")[0],
      dateEcheance: tomorrow.toISOString().split("T")[0],
      designation: `${values.designation} (${values.month}/2024)`,
      legalText: values.legalText || DEFAULT_LEGAL_TEXT,
      bankDetails: values.bankDetails || DEFAULT_BANK_DETAILS,
    });
  };

  return (
    <div className="p-2 sm:p-4">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-4">
        Création de facture
      </h2>

      <div className="overflow-auto">
        <Formik
          initialValues={{
            month: new Date().getMonth() + 1,
            designation: "LOYER MENSUEL LOCAL",
            tva: 5.5,
            prix: 1000,
            quantite: 1,
            legalText: DEFAULT_LEGAL_TEXT,
            bankDetails: DEFAULT_BANK_DETAILS,
          }}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-3 sm:space-y-4">
            <div className="rounded-lg bg-gray-50 p-3 sm:p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Mois de facturation
              </h3>
              <Field
                as="select"
                name="month"
                className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm"
              >
                {monthOptions.map((month) => (
                  <option key={month} value={month}>
                    Mois {month}
                  </option>
                ))}
              </Field>
            </div>

            <div className="rounded-lg bg-gray-50 p-3 sm:p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Détails de la commande
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    Désignation
                  </label>
                  <Field
                    name="designation"
                    className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm"
                  />
                </div>
                {/* Répéter le même pattern pour les autres champs */}
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-3 sm:p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Informations légales
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    Texte légal
                  </label>
                  <Field
                    as="textarea"
                    name="legalText"
                    rows="2"
                    className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    Informations bancaires
                  </label>
                  <Field
                    as="textarea"
                    name="bankDetails"
                    rows="3"
                    className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-3 sm:pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg"
              >
                Générer la facture
              </button>
              {onSubmit.formData && (
                <PDFDownloadLink
                  document={<InvoicePDF data={onSubmit.formData} />}
                  fileName="facture.pdf"
                  className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white font-medium text-sm rounded-lg text-center"
                >
                  Télécharger PDF
                </PDFDownloadLink>
              )}
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

function App() {
  const [formData, setFormData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-4 sm:py-12 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 gap-4 sm:gap-8 items-start">
          {/* Formulaire */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4 lg:mb-0 lg:sticky lg:top-4">
            <div className="h-full overflow-auto">
              <InvoiceForm onSubmit={(data) => {
                setFormData(data);
                setShowPreview(true);
              }} />
            </div>
          </div>
          
          {/* Prévisualisation avec toggle sur mobile */}
          <div className={`${!showPreview && 'hidden lg:block'}`}>
            <div className="sticky top-4">
              {/* Bouton retour sur mobile */}
              <button
                className="lg:hidden w-full mb-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                onClick={() => setShowPreview(false)}
              >
                Retour au formulaire
              </button>
              
              {formData ? (
                <PDFPreview document={<InvoicePDF data={formData} />} />
              ) : (
                <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300" style={{ aspectRatio: '1/1.4142' }}>
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500 text-sm sm:text-base text-center px-4">
                      Remplissez le formulaire pour voir l'aperçu
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;