// export function uncheckFilterPastille(filter) {

//     if (this.CategoryChecked[filter]) {
//         this.CategoryChecked[filter] = false;

//     } else if (this.SubGroupChecked[filter]) {
//         this.SubGroupChecked[filter] = false;
//         this.subGroupExists = false;

//     } else if (this.SubGroupChoiceChecked[filter]) {
//         this.SubGroupChoiceChecked[filter] = false;
//         this.subGroupChoiceExists = false;

//     } else if (this.SubGroupChoiceDetailChecked[filter]) {
//         this.SubGroupChoiceDetailChecked[filter] = false;
//         this.subGroupChoiceDetailExists = false;
//     }

//     const index = this.selectedFilters.indexOf(filter); // bien que le "check" soit removed avec uncheckFilterPastille, il faut supprimer la valeur du array selectedFilters avec splice
//     if (index !== -1) {
//         this.selectedFilters.splice(index, 1);
//     }

//     this.toggleSubDropdown(filter); // va actioner "toggleSubDropdown" si le filter clique a cette fonction associe
//     this.handleEmits();
// }