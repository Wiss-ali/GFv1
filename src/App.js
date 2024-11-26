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
    <div className="p-4"> {/* Padding réduit */}
      <h2 className="text-xl font-bold text-gray-800 mb-4"> {/* Taille titre réduite */}
        Création de facture
      </h2>

      <div className="overflow-auto"> {/* Pour permettre le scroll */}
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
          <Form className="space-y-4"> {/* Espacement réduit */}
            <div className="rounded-lg bg-gray-50 p-4"> {/* Padding réduit */}
              <h3 className="text-sm font-semibold text-gray-900 mb-2"> {/* Taille texte réduite */}
                Mois de facturation
              </h3>
              <Field
                as="select"
                name="month"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              >
                {monthOptions.map((month) => (
                  <option key={month} value={month}>
                    Mois {month}
                  </option>
                ))}
              </Field>
            </div>

            <div className="rounded-lg bg-gray-50 p-4"> {/* Padding réduit */}
              <h3 className="text-sm font-semibold text-gray-900 mb-2"> {/* Taille texte réduite */}
                Détails de la commande
              </h3>
              <div className="grid md:grid-cols-2 gap-4"> {/* Gap réduit */}
                <div className="space-y-1"> {/* Espacement réduit */}
                  <label className="block text-xs font-medium text-gray-700">
                    Désignation
                  </label>
                  <Field
                    name="designation"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    TVA (%)
                  </label>
                  <Field
                    as="select"
                    name="tva"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    {tvaOptions.map((rate) => (
                      <option key={rate} value={rate}>
                        {rate}%
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    Prix HT
                  </label>
                  <Field
                    name="prix"
                    type="number"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    Quantité
                  </label>
                  <Field
                    as="select"
                    name="quantite"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  >
                    {qteOptions.map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4"> {/* Padding réduit */}
              <h3 className="text-sm font-semibold text-gray-900 mb-2"> {/* Taille texte réduite */}
                Informations légales
              </h3>
              <div className="space-y-3"> {/* Espacement réduit */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    Texte légal
                  </label>
                  <Field
                    as="textarea"
                    name="legalText"
                    rows="2"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
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
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4"> {/* Padding réduit */}
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Générer la facture
              </button>
              {onSubmit.formData && (
                <PDFDownloadLink
                  document={<InvoicePDF data={onSubmit.formData} />}
                  fileName="facture.pdf"
                  className="px-4 py-2 bg-green-600 text-white font-medium text-sm rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Colonne de gauche - Formulaire */}
          <div className="sticky top-4"> {/* Ajout de sticky positioning */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ aspectRatio: '1/1.4142' }}> {/* Même ratio que le PDF */}
              <div className="h-full overflow-auto"> {/* Permet le scroll si le contenu dépasse */}
                <InvoiceForm onSubmit={setFormData} />
              </div>
            </div>
          </div>
          
          {/* Colonne de droite - Prévisualisation */}
          <div> {/* Suppression de la hauteur fixe */}
            {formData ? (
              <PDFPreview document={<InvoicePDF data={formData} />} />
            ) : (
              <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300" style={{ aspectRatio: '1/1.4142' }}>
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Remplissez le formulaire pour voir l'aperçu</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
