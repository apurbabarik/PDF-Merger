import PDFMerger from 'pdf-merger-js';

var merger = new PDFMerger();

const mergePdfs=async (P1,P2) => {
  await merger.add(P1);  
  await merger.add(P2); 
  await merger.save('public/merged.pdf'); 
}
export  {mergePdfs} 