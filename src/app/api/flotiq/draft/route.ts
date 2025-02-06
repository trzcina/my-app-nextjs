import { draftMode } from "next/headers";
import { NextRequest } from "next/server";
import { redirect } from 'next/navigation'

export async function GET(req: NextRequest) {
    const editorkey = req.nextUrl.searchParams.get('key') || '';
    const redirectPath = req.nextUrl.searchParams.get('redirect') || '/';
    if(editorkey !== process.env.FLOTIQ_CLIENT_AUTH_KEY) {
        return new Response('Unauthorized', {status: 401});
    }

    const draftState = await draftMode();
    const newDraft = req.nextUrl.searchParams.has('draft') ? req.nextUrl.searchParams.get('draft') === 'true' : !draftState.isEnabled;
    if(newDraft) {
        draftState.enable();
    } else {
        draftState.disable();
    }
    redirect(redirectPath);
}