/**
 * Utility to export batch transcription data as a consolidated CSV file
 */
export function exportToCSV(items: any[], filename = 'RevPro_Bulk_Report.csv') {
  if (!items || items.length === 0) return;

  // Header row
  const headers = ['Platform', 'Original URL', 'Processing Status', 'Transcript', 'AI Summary', 'Created At'];
  
  // Data rows
  const rows = items.map(item => [
    item.platform || 'unknown',
    item.url || '',
    item.status || 'unknown',
    // Escape quotes and wrap in quotes for CSV compliance
    `"${(item.transcript || '').replace(/"/g, '""')}"`,
    `"${(item.refined || '').replace(/"/g, '""')}"`,
    new Date(item.created_at || Date.now()).toLocaleString()
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
