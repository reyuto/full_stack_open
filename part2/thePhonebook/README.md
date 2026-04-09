# Exercises 2.6.-2.10

## 2.6: The Phonebook Step 1

Let's create a simple phonebook. *In this part, we will only be adding names to the phonebook.*

## 2.7: The Phonebook Step 2

Prevent the user from being able to add names that already exist in the phonebook. JavaScript arrays have numerous suitable methods for accomplishing this task. Keep in mind how object equality works in Javascript.

## 2.8: The Phonebook Step 3

Expand your application by allowing users to add phone numbers to the phone book. You will need to add a second input element to the form (along with its own event handler)

## 2.9*: The Phonebook Step 4

Implement a search field that can be used to filter the list of people by name

## 2.10: The Phonebook Step 5

If you have implemented your application in a single component, refactor it by extracting suitable parts into new components. Maintain the application's state and all event handlers in the *App* root component.

## 2.11: The Phonebook Step 6

We continue with developing the phonebook. Store the initial state of the application in the file db.json, which should be placed in the root of the project.

## 2.12: The Phonebook step 7

Currently, the numbers that are added to the phonebook are not saved to a backend server. Fix this situation.

## 2.13: The Phonebook step 8

Extract the code that handles the communication with the backend into its own module by following the example shown earlier in this part of the course material.

## 2.14: The Phonebook step 9

Make it possible for users to delete entries from the phonebook. The deletion can be done through a dedicated button for each person in the phonebook list. You can confirm the action from the user by using the window.confirm method.

## 2.15*: The Phonebook step 10

Change the functionality so that if a number is added to an already existing user, the new number will replace the old number. It's recommended to use the HTTP PUT method for updating the phone number.

## 2.16: Phonebook step 11

Use the improved error message example from part 2 as a guide to show a notification that lasts for a few seconds after a successful operation is executed (a person is added or a number is changed)

## 2.17*: Phonebook step 12

Open your application in two browsers. If you delete a person in browser 1 a short while before attempting to change the person's phone number in browser 2, you will get the following error messages.
