import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Format date for filename
const getFormattedDate = (): string => {
  const date = new Date();
  return date.toISOString().split("T")[0];
};

// Generate a filename with date
const generateFilename = (format: string): string => {
  return `saas-ideas-${getFormattedDate()}.${format}`;
};

/**
 * Export ideas to PDF format
 */
export const exportToPdf = (
  ideas: Array<{
    id: string;
    title: string;
    description: string;
    marketSize: string;
    difficulty: string;
    isFavorite: boolean;
    source?: string;
  }>,
): void => {
  try {
    // Create new PDF document
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.text("SaaS Ideas", 14, 22);

    // Add generation date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // Prepare data for table
    const tableData = ideas.map((idea) => [
      idea.title,
      idea.description,
      idea.marketSize,
      idea.difficulty,
      idea.source || "Unknown",
      idea.isFavorite ? "Yes" : "No",
    ]);

    // Create table
    autoTable(doc, {
      head: [
        [
          "Title",
          "Description",
          "Market Size",
          "Difficulty",
          "Source",
          "Favorite",
        ],
      ],
      body: tableData,
      startY: 35,
      styles: { overflow: "linebreak", cellWidth: "wrap" },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 70 },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 20 },
        5: { cellWidth: 20 },
      },
      headStyles: { fillColor: [41, 50, 65] },
    });

    // Save the PDF
    doc.save(generateFilename("pdf"));
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF");
  }
};

/**
 * Export ideas to CSV format
 */
export const exportToCsv = (
  ideas: Array<{
    id: string;
    title: string;
    description: string;
    marketSize: string;
    difficulty: string;
    isFavorite: boolean;
    source?: string;
  }>,
): void => {
  try {
    // CSV header
    const header = [
      "Title",
      "Description",
      "Market Size",
      "Difficulty",
      "Source",
      "Favorite",
    ];

    // Format ideas as CSV rows
    const rows = ideas.map((idea) => [
      `"${idea.title.replace(/"/g, '""')}"`,
      `"${idea.description.replace(/"/g, '""')}"`,
      `"${idea.marketSize}"`,
      `"${idea.difficulty}"`,
      `"${idea.source || "Unknown"}"`,
      `"${idea.isFavorite ? "Yes" : "No"}"`,
    ]);

    // Combine header and rows
    const csvContent = [
      header.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a download link and trigger download
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", generateFilename("csv"));
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error generating CSV:", error);
    throw new Error("Failed to generate CSV");
  }
};
