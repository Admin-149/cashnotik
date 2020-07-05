
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateAccountInput {
    amount: number;
    title: string;
}

export interface UpdateAccountInput {
    amount?: number;
    id: number;
    title?: string;
}

export interface AuthInput {
    username: string;
    password: string;
}

export interface CreateCategoryInput {
    title: string;
}

export interface UpdateCategoryInput {
    id: number;
    title: string;
}

export interface CreateOperationInput {
    accountId: number;
    amount: number;
    categoryId: number;
    date: Date;
    title: string;
}

export interface UpdateOperationInput {
    accountId?: number;
    amount?: number;
    categoryId?: number;
    date?: Date;
    id: number;
    title?: string;
}

export interface Account {
    __typename?: 'Account';
    amount: number;
    id: number;
    title: string;
}

export interface IQuery {
    __typename?: 'IQuery';
    account(id: number): Account | Promise<Account>;
    accounts(): Account[] | Promise<Account[]>;
    me(): User | Promise<User>;
    categories(): Category[] | Promise<Category[]>;
    category(id: number): Category | Promise<Category>;
    operations(): Operation[] | Promise<Operation[]>;
    operation(id: number): Operation | Promise<Operation>;
}

export interface IMutation {
    __typename?: 'IMutation';
    createAccount(params: CreateAccountInput): Account | Promise<Account>;
    deleteAccount(id: number): Account | Promise<Account>;
    updateAccount(params: UpdateAccountInput): Account | Promise<Account>;
    login(input?: AuthInput): Token | Promise<Token>;
    register(input?: AuthInput): Token | Promise<Token>;
    createCategory(input: CreateCategoryInput): Category | Promise<Category>;
    updateCategory(input: UpdateCategoryInput): Category | Promise<Category>;
    deleteCategory(id: number): Category | Promise<Category>;
    createOperation(params: CreateOperationInput): Operation | Promise<Operation>;
    updateOperation(params: UpdateOperationInput): Operation | Promise<Operation>;
    deleteOperation(id: number): Operation | Promise<Operation>;
}

export interface User {
    __typename?: 'User';
    id: string;
    username: string;
}

export interface Token {
    __typename?: 'Token';
    accessToken: string;
}

export interface Category {
    __typename?: 'Category';
    id: number;
    title: string;
    operations: Operation[];
}

export interface Operation {
    __typename?: 'Operation';
    id: number;
    amount: number;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
    title?: string;
}
