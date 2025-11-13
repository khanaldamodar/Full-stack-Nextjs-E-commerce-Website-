"use client"
import { DataTable } from '@/components/admin-components-deepak/DataTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
import Cookies from "js-cookie"
interface ContactTypes {
    id: number;
    name: string;
    phone: string;
    message: string;
}
const page = () => {

    const [contacts, setContacts] = useState<ContactTypes[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const res = await fetch("/api/contacts");
                const data = await res.json();
                console.log(data.contacts)
                setContacts(data.contacts)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchContact()
    }, [])

    const handleDelete = async (contact: ContactTypes) => {
        if (!confirm(`Are you sure you want to delete "${contact.name}"?`)) return;
        try {
            await axios.delete(`/api/contacts/${contact.id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });
            toast.success("Contact deleted successfully");
            setContacts(contacts.filter((p) => p.id !== contact.id));
        } catch (err) {
            toast.error("Failed to delete Contact");
            console.error(err);
        }

    }
    return (
        <div className="p-6 space-y-6 font-poppins">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Contacts</h1>

            </div>

            {loading ? (
                <p className="text-center py-10 text-gray-500">Loading Contacts...</p>
            ) : (
                <DataTable
                    title="Contacts"
                    data={contacts}
                    columns={[

                        { key: "name", label: "Person Name" },
                        { key: "phone", label: "Phone Number" },
                        { key: "message", label: "Message" },
                    ]}


                    onDelete={handleDelete}
                />
            )}
        </div>
    )
}

export default page