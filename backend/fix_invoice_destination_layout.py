from pathlib import Path
from copy import copy

from openpyxl import load_workbook


BASE_DIR = Path(__file__).resolve().parent

TEMPLATE_PATH = (
    BASE_DIR
    / "templates"
    / "ExportFlow_Master_Template.xlsx"
)


def normalize(value):
    if value is None:
        return ""

    return " ".join(
        str(value)
        .replace("\n", " ")
        .split()
    )


def find_cell(ws, wanted):
    wanted = normalize(
        wanted
    )

    for row in ws.iter_rows():
        for cell in row:

            if normalize(
                cell.value
            ) == wanted:
                return cell

    return None


def merged_range_for(
    ws,
    coordinate,
):
    for merged_range in (
        ws.merged_cells.ranges
    ):
        if (
            coordinate
            in merged_range
        ):
            return merged_range

    return None


wb = load_workbook(
    TEMPLATE_PATH
)

ws = wb["Invoice"]


# ============================================================
# 1. FINAL DESTINATION -> US
# ============================================================

final_destination = find_cell(
    ws,
    "Final Destination",
)

if final_destination is None:
    raise RuntimeError(
        "Final Destination was not found."
    )


value_row = (
    final_destination.row
    + 1
)

value_col = (
    final_destination.column
)


value_cell = ws.cell(
    row=value_row,
    column=value_col,
)


value_merge = merged_range_for(
    ws,
    value_cell.coordinate,
)


if value_merge:
    value_cell = ws.cell(
        row=value_merge.min_row,
        column=value_merge.min_col,
    )


value_cell.value = "US"


# ============================================================
# 2. ALIGN CSB TYPE WITH TOTAL CESS PAID
#
# Target layout:
#
#                CSB Type: | Commercial
# Total Cess Paid (USD):    | 0
#
# Both must use exactly the same label/value columns.
# ============================================================

csb_cell = find_cell(
    ws,
    "CSB Type:",
)

commercial_cell = find_cell(
    ws,
    "Commercial",
)

cess_cell = find_cell(
    ws,
    "Total Cess Paid (USD):",
)


if csb_cell is None:
    raise RuntimeError(
        "CSB Type cell was not found."
    )


if commercial_cell is None:
    raise RuntimeError(
        "Commercial cell was not found."
    )


if cess_cell is None:
    raise RuntimeError(
        "Total Cess Paid cell was not found."
    )


# Find the value 0 on the same row
# as Total Cess Paid.
zero_cell = None

for cell in ws[
    cess_cell.row
]:

    if (
        cell.column
        > cess_cell.column
        and
        normalize(
            cell.value
        )
        == "0"
    ):
        zero_cell = cell
        break


if zero_cell is None:
    raise RuntimeError(
        "Total Cess Paid value 0 was not found."
    )


# Save styles before changing merge structure.
cess_style = copy(
    cess_cell._style
)

commercial_style = copy(
    commercial_cell._style
)

zero_style = copy(
    zero_cell._style
)


# CSB Type may currently be merged
# across two columns.
csb_merge = merged_range_for(
    ws,
    csb_cell.coordinate,
)


csb_value = (
    csb_cell.value
)


if csb_merge:
    ws.unmerge_cells(
        str(
            csb_merge
        )
    )


# Make CSB Type use exactly the
# same column as Total Cess Paid.
new_csb_cell = ws.cell(
    row=csb_cell.row,
    column=cess_cell.column,
)


# Clear the old CSB location if
# it is different.
old_csb_cell = ws.cell(
    row=csb_cell.row,
    column=csb_cell.column,
)


if (
    old_csb_cell.coordinate
    !=
    new_csb_cell.coordinate
):
    old_csb_cell.value = None


new_csb_cell.value = (
    csb_value
)

new_csb_cell._style = copy(
    cess_style
)


# Commercial must be directly
# above the Total Cess value.
target_commercial = ws.cell(
    row=csb_cell.row,
    column=zero_cell.column,
)


if (
    commercial_cell.coordinate
    !=
    target_commercial.coordinate
):
    target_commercial.value = (
        commercial_cell.value
    )

    commercial_cell.value = None


target_commercial._style = copy(
    zero_style
)


# Explicitly keep the bottom
# value aligned with Commercial.
zero_cell._style = copy(
    zero_style
)


# ============================================================
# SAVE
# ============================================================

wb.save(
    TEMPLATE_PATH
)


# ============================================================
# VERIFY
# ============================================================

check_wb = load_workbook(
    TEMPLATE_PATH
)

check_ws = check_wb[
    "Invoice"
]


check_final = find_cell(
    check_ws,
    "Final Destination",
)

check_csb = find_cell(
    check_ws,
    "CSB Type:",
)

check_commercial = find_cell(
    check_ws,
    "Commercial",
)

check_cess = find_cell(
    check_ws,
    "Total Cess Paid (USD):",
)


check_us = None

if check_final:
    check_us_cell = check_ws.cell(
        row=check_final.row + 1,
        column=check_final.column,
    )

    check_merge = merged_range_for(
        check_ws,
        check_us_cell.coordinate,
    )

    if check_merge:
        check_us_cell = check_ws.cell(
            row=check_merge.min_row,
            column=check_merge.min_col,
        )

    check_us = (
        check_us_cell.value
    )


print()
print(
    "Final Destination:",
    check_us,
)

print(
    "CSB Type column:",
    check_csb.column_letter
    if check_csb
    else "NOT FOUND",
)

print(
    "Commercial column:",
    check_commercial.column_letter
    if check_commercial
    else "NOT FOUND",
)

print(
    "Total Cess column:",
    check_cess.column_letter
    if check_cess
    else "NOT FOUND",
)

print()
print(
    "DocPort invoice destination "
    "and alignment fixed successfully."
)