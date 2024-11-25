// import tinymce from "tinymce";

// const capitalizeFirstLetterPlugin = (editor: tinymce.Editor) => {
//     editor.ui.registry.addButton("capitalizeFirstLetter", {
//         text: "Capitalize First Letter",
//         onAction: function () {
//             // Get the selected content in the editor
//             const selectedText = editor.selection.getContent();

//             // Check if there is selected text
//             if (selectedText) {
//                 // Capitalize the first letter of the selected text
//                 const capitalized =
//                     selectedText.charAt(0).toUpperCase() +
//                     selectedText.slice(1);

//                 // Set the modified content back to the editor
//                 editor.selection.setContent(capitalized);
//             }
//         },
//     });
// };

// // Register the plugin with TinyMCE
// tinymce.PluginManager.add("capitalizeFirstLetter", capitalizeFirstLetterPlugin);

// File: plugins/capitalize-first-letter-plugin.ts

import tinymce from "tinymce";

const capitalizeFirstLetterPlugin = (editor: tinymce.Editor) => {
    editor.ui.registry.addButton("capitalizeFirstLetter", {
        text: "Capitalize First Letter",
        onAction: function () {
            // Get the selected content in the editor
            const selectedText = editor.selection.getContent({
                format: "text",
            });

            // Check if there is selected text
            if (selectedText) {
                // Capitalize the first letter of each word
                const capitalized = selectedText
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");

                // Set the modified content back to the editor
                editor.selection.setContent(capitalized);
            } else {
                alert("Please select some text to capitalize.");
            }
        },
    });
};

// Register the plugin with TinyMCE
tinymce.PluginManager.add("capitalizeFirstLetter", capitalizeFirstLetterPlugin);
