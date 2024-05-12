import type { NextApiRequest, NextApiResponse } from "next";
import React, { ChangeEvent, useEffect, useState } from "react";
type Data = {
    success: boolean;
    data?: unknown;
};


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const url = "https://stm-dev.intentio.co.za/api/portal/user/register";
        if (req.method === "GET") {
            let response = null;
            response = await fetch( `${url}/api/portal`);
            const result = await response.json();
            res.status(200).json({ success: true, data: result });
            
        }
        
        if (req.method === "POST") {
            let response = null;
            console.log('📢 [portal.ts:25]', req.body);
            const options = {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
               
         body: JSON.stringify({
            first_name: req.body.first_name || '',
            last_name: req.body.last_name || '',
            identification_reference: req.body.identification_reference || '',
            identification_type: req.body.identification_type || '',
            Identitynumber: req.body.dentitynumber ||'',
            complex: req.body.complex ||'',
            unitNO: req.body.unitNO ||'',
            streetaddress: req.body.streetaddress ||' ',
           province: req.body.province ||'',
           zipcode: req.body.zipcode ||'',
           postaladdress: req.body.postaladdress ||'',
           email: req.body.email || '',
            mobile_number: req.body.mobile_number || '',
            landline_number: req.body.landline_number || '',
            alternate_number: req.body.alternate_number || '',
            Creditcard: req.body.creditcard === 'checked' ? 'checked' : 'unchecked',
            terms: req.body.terms === 'checked' ? 'checked' : 'unchecked',
            
           
                }),
            };
            response = await fetch(`${url}/user/register`, options);
            if (!response.ok) {
                console.log('📢 url ', response.body);
                console.log('📢 url ', response.url);
                const data = await response.json();
                console.log('📢 [portal.ts:33] response ', data);
                res.status(500).json({ success: false, data });

                throw new Error(
                    `Failed to create : ${response.statusText}`
                );
            }
            const data = await response.json();

            res.status(200).json(data);
        }

        if (req.method === "PUT") {
            let response = null;
            response = await fetch(`${url}/products`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req.body),
            });

            const data = await response.json();

            res.status(200).json({ ...data });
        }

        if (req.method === "DELETE") {
            let response = null;
            response = await fetch(`${url}/products`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req.body),
            });

            res.status(200).json({ success: true });
        }
    } catch (e) {
    }
}

