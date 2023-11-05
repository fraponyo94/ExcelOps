package com.techgeeknext.util;

import com.techgeeknext.model.Employee;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.CellRangeAddressList;
import org.apache.poi.xssf.usermodel.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class ExcelGeneratorUtility {

    public static void employeeDetailReport(HttpServletResponse response, List<Employee> employees) {
        try(Workbook workbook = new XSSFWorkbook()){
          XSSFSheet sheet = (XSSFSheet)workbook.createSheet("Employee TechGeekNext Example");
//              sheet.protectSheet("password");

            CellStyle cellStyle = workbook.createCellStyle();





            //set border to table
            cellStyle.setBorderTop(BorderStyle.MEDIUM);
            cellStyle.setBorderRight(BorderStyle.MEDIUM);
            cellStyle.setBorderBottom(BorderStyle.MEDIUM);
            cellStyle.setBorderLeft(BorderStyle.MEDIUM);
            cellStyle.setAlignment(HorizontalAlignment.LEFT);
          cellStyle.setLocked(false);



          // Header
            Row row = sheet.createRow(0);
            Cell cell = row.createCell(0);
            cell.setCellValue("Id");
//            cell.setCellStyle(cellStyle);

              CellStyle unlockedCellStyle = workbook.createCellStyle();// wb-> workbook
                    unlockedCellStyle.setLocked(true); //you need to set it based on your //requirements
                    cell.setCellStyle(unlockedCellStyle); //cell-> the cell you need to lock

//          unlockedCellStyle.setFillForegroundColor(HSSFColor.HSSFColorPredefined.GOLD.getIndex());
          unlockedCellStyle.setFillForegroundColor(IndexedColors.BLUE.index);
          unlockedCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
          cell.setCellStyle(unlockedCellStyle);

          addComment(workbook,sheet,cell,row,"Auto","xxxxxxxxxxxxxxxxxxxxxxxxx");


          // Data Type Columns
          XSSFDataValidationHelper dvHelper = new XSSFDataValidationHelper(sheet);

          XSSFDataValidationConstraint dvConstraint =
            (XSSFDataValidationConstraint)
              dvHelper.createNumericConstraint(
                XSSFDataValidationConstraint.ValidationType.DECIMAL,
                XSSFDataValidationConstraint.OperatorType.BETWEEN,
                String.valueOf(Float.MIN_VALUE),
                String.valueOf(Float.MAX_VALUE)
              );

            // Cell range is important here.
                      CellRangeAddressList addressList = new CellRangeAddressList(
                        1, 10, 0, 1);
            // 0 - starting row, 2 - ending row
            // 1 - starting col, 3 - ending col

          XSSFDataValidation validation =(XSSFDataValidation)dvHelper.createValidation(
            dvConstraint, addressList);
          validation.setSuppressDropDownArrow(false);
          validation.setShowErrorBox(true);
          sheet.addValidationData(validation);



           // ADD drop down
          DataValidation dataValidation = null;
          DataValidationConstraint constraint = null;
          DataValidationHelper validationHelper = null;

          validationHelper = new XSSFDataValidationHelper(sheet);
          CellRangeAddressList addressList1= new CellRangeAddressList(0, 11, 4, 4);
          constraint = validationHelper.createExplicitListConstraint(new String[]{"JOHN", "JAMES", "EMMANUEL"});
          dataValidation = validationHelper.createValidation(constraint, addressList1);
          dataValidation.setSuppressDropDownArrow(true);
//          dataValidation.setSuppressDropDownArrow(true);
          dataValidation.setShowErrorBox(true);
          dataValidation.setShowPromptBox(true);
          sheet.addValidationData(dataValidation);



          Cell cell1 = row.createCell(1);
            cell1.setCellValue("Name");


            cell1.setCellStyle(cellStyle);


            Cell cell2 = row.createCell(2);
            cell2.setCellValue("Role");
            cell2.setCellStyle(cellStyle);



            // Apply to arrange of cells
           CellRangeAddress region = addressList1.getCellRangeAddress(0);//CellRangeAddress.valueOf("D1:D20");
//          CellStyle cellStyle2 = workbook.createCellStyle();
//          cellStyle2.setLocked(false);

          for(int i=region.getFirstRow();i<region.getLastRow();i++){
            Row row1 = sheet.getRow(i);
            for(int j=region.getFirstColumn();j<region.getLastColumn();j++){
              Cell cell3 = row1.getCell(j);
              cell3.setCellStyle(cellStyle);
            }
          }




          //Set data
            int rowNum = 1;
            for (Employee emp : employees) {
                Row empDataRow = sheet.createRow(rowNum++);
                Cell empIdCell = empDataRow.createCell(0);
                empIdCell.setCellStyle(cellStyle);
                empIdCell.setCellValue(emp.getId());

                Cell empNameCell = empDataRow.createCell(1);
                empNameCell.setCellStyle(cellStyle);
                empNameCell.setCellValue(emp.getName());

                Cell empRoleCell = empDataRow.createCell(2);
                empRoleCell.setCellStyle(cellStyle);
                empRoleCell.setCellValue(emp.getRole());
            }

            //write output to response
            workbook.write(response.getOutputStream());

        } catch (IOException e) {
            e.printStackTrace();
        }
    }


  public static void addComment(Workbook workbook, Sheet sheet, Cell cell, Row rowIdx, String author, String commentText) {
    CreationHelper factory = workbook.getCreationHelper();
    //get an existing cell or create it otherwise:
//    Cell cell = getOrCreateCell(sheet, rowIdx, colIdx);

    ClientAnchor anchor = factory.createClientAnchor();
    //i found it useful to show the comment box at the bottom right corner
    anchor.setCol1(cell.getColumnIndex() + 1); //the box of the comment starts at this given column...
    anchor.setCol2(cell.getColumnIndex() + 3); //...and ends at that given column
    anchor.setRow1(rowIdx.getRowNum() + 1); //one row below the cell...
    anchor.setRow2(rowIdx.getRowNum() + 5); //...and 4 rows high

    Drawing drawing = sheet.createDrawingPatriarch();
    Comment comment = drawing.createCellComment(anchor);
    //set the comment text and author
    comment.setString(factory.createRichTextString(commentText));
    comment.setAuthor(author);

    cell.setCellComment(comment);
  }
}
